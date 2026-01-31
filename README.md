## Project Structure

### Feature-based organization — components grouped by functionality (features/search, features/hero, features/products)

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group for auth
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/                   # Route group for shop
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   └── checkout/
│   ├── api/                      # API routes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/                       # Base UI components (Button, Input, Card, etc.)
│   ├── layout/                   # Layout components ✓
│   │   ├── Footer.tsx ✓
│   │   └── Header.tsx ✓
│   ├── features/                 # Feature-specific
│   │   ├── search/
│   │   │   └── SearchBar.tsx
│   │   ├── hero/
│   │   │   └── HeroSection.tsx
│   │   ├── products/
│   │   ├── cart/
│   │   └── ...
│   └── shared/                   # Reusable components
│       └── Logo.tsx
│
├── lib/                          # Utilities and libraries
│   ├── utils.ts                  # General utilities (cn function, etc.)
│   └── format.ts                 # Formatting (prices, dates)
│
├── types/                        # TypeScript types
│   ├── product.ts
│   ├── cart.ts
│   └── api.ts
│
├── constants/                    # Constants
│   ├── routes.ts                 # Routes
│   └── config.ts                 # Configs
│
├── hooks/                        # Custom React hooks
│   └── useDebounce.ts
│
└── services/                     # API services
    └── api/
        └── products.ts
```
