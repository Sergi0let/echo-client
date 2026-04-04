import mongoose from 'mongoose';

let connecting: Promise<void> | null = null;

/**
 * Підключення до MongoDB один раз на процес (idempotent).
 *
 * `mongoose.connection.readyState`: 0 — disconnected, 1 — connected, 2 — connecting,
 * 3 — disconnecting. Якщо вже `1`, повторний `connect` не викликаємо — з’єднання живе.
 * Після розриву стан стає `0`, наступний виклик знову відкриє конекшн.
 *
 * `connecting` — спільний Promise на час поточного підключення: паралельні виклики
 * (наприклад при старті) чекають один `mongoose.connect`, а не кілька гонок.
 * У `finally` обнуляємо, щоб після помилки можна було повторити, після успіху —
 * наступні виклики відсікаються через `readyState === 1`.
 */
export const connectOrderDB = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (connecting) {
    return connecting;
  }

  connecting = (async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('Connected to order database');
    } catch (error) {
      console.error('Error connecting to order database', error);
      throw error;
    } finally {
      connecting = null;
    }
  })();

  return connecting;
};
