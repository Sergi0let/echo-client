# Clerk-автентифікація в order-service

## Мета

Описано, як **order-service** (Fastify) приймає автентифіковані запити через **Clerk**: плагін, змінні оточення, публічні метадані користувача з полем `role` (наприклад `"user"`), а також middleware на базі `getAuth` і `sessionClaims`.

## Підключення Clerk

У точці входу сервісу реєструється офіційний плагін Clerk для Fastify:

- Файл: [`apps/order-service/src/index.ts`](../apps/order-service/src/index.ts)
- Код: `fastify.register(clerkPlugin)` після створення екземпляра Fastify.

Потрібні стандартні змінні оточення Clerk (див. [Clerk Fastify](https://clerk.com/docs/references/fastify/overview)):

- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Значення ключів у цю замітку не дублюємо — їх задають локально в `.env` або в секретах оточення деплою.

## Public metadata і роль `user`

Щоб у сесії користувача була роль (наприклад звичайний користувач), у Clerk задають **public metadata** з об’єктом на кшталт:

```json
{ "role": "user" }
```

Зробити це можна:

- через [Clerk Dashboard → Users → Metadata (public)](https://clerk.com/docs/users/metadata#public-metadata), або
- через [Backend API: оновлення метаданих користувача](https://clerk.com/docs/reference/backend-api/tag/Users) (наприклад оновлення `public_metadata`).

Як саме поля з `public_metadata` потрапляють у **JWT / session token**, залежить від [налаштування claims у Clerk](https://clerk.com/docs/backend-requests/making/jwt-templates) (шаблон сесії). У цьому репозиторії TypeScript очікує, що в `sessionClaims` з’явиться вкладений об’єкт **`metadata`** з полем **`role`**, узгоджений з інтерфейсом `CustomJwtSessionClaims`:

- Файл: [`packages/types/src/auth.ts`](../packages/types/src/auth.ts)

```typescript
export interface CustomJwtSessionClaims {
  metadata?: {
    role?: 'admin' | 'user';
  };
}
```

Якщо у вашому шаблоні Clerk claims названі інакше (наприклад `public_metadata`), потрібно або змінити шаблон, або оновити тип і звернення до полів у middleware.

## Middleware

Файл: [`apps/order-service/src/middleware/authMiddleware.ts`](../apps/order-service/src/middleware/authMiddleware.ts)

Використовується `getAuth(request)` з пакета `@clerk/fastify`. Після успішної перевірки `userId` записується в `request.userId` (розширення `FastifyRequest` оголошене в цьому ж файлі).

| Функція        | Умова успіху | Помилки |
|----------------|--------------|---------|
| `shouldBeUser` | Є `userId` (користувач залогінений) | `401` — немає сесії / не залогінений |
| `shouldBeAdmin` | Є `userId` і `sessionClaims.metadata.role === 'admin'` | `401` — немає сесії; `403` — роль не `admin` |

Приклад використання `shouldBeUser` як `preHandler`: маршрут `/test` у [`apps/order-service/src/index.ts`](../apps/order-service/src/index.ts).

### Примітка про маршрути «тільки user»

Зараз **`shouldBeUser` не перевіряє** `sessionClaims.metadata.role === 'user'` — лише факт наявності сесії та `userId`. Роль `"user"` у public metadata корисна для узгодження даних у Clerk і для майбутніх перевірок; якщо потрібно **жорстко** вимагати саме роль `user`, треба додати окрему перевірку claims у middleware (за аналогією з `shouldBeAdmin`).

## Коротка схема

```mermaid
flowchart LR
  Client[Client з Clerk session]
  Fastify[Fastify plus clerkPlugin]
  MW[middleware getAuth]
  Handler[Route handler]

  Client --> Fastify
  Fastify --> MW
  MW --> Handler
```

Public metadata з Clerk (на кшталт `{ role: user }`) після налаштування claims потрапляє в `sessionClaims.metadata.role` і використовується в `shouldBeAdmin`; для базового доступу користувача достатньо `shouldBeUser` і валідної сесії.
