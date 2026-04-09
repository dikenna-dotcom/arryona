# 🗺️ ARRYONA Site Map & Architecture

## User Journey Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PUBLIC USERS                                 │
└─────────────────────────────────────────────────────────────────────┘

                            HOMEPAGE (/)
                    ┌───────────────┬─────────────┘
                    │               │
                    ▼               ▼
              SHOP (/shop)    SIGNUP (/signup)
                    │               │
                    ├─────────┬─────┘
                    │         │
              Product Detail  LOGIN (/login)
           (/product/[id])     │
                    │         │
                    └────┬────┘
                         ▼
                  SHOPPING CART (/cart)
                         │
                ┌────────┴─────────┐
                │                  │
              LOGIN           CHECKOUT*
            (required)        (Stripe)

* Requires authentication
```

## Page Hierarchy

### Level 1: Main Pages
- **/** (Homepage) - Entry point, featured products
- **/shop** - Product catalog (browsable without login)
- **/cart** - Shopping cart (accessible anytime)

### Level 2: Authentication
- **/signup** - Create new account
- **/login** - Sign in with email/password

### Level 3: Product Details
- **/product/[id]** - Individual product page (dynamic)

### Level 4: Checkout (Protected)
- **/checkout** - (Will require authentication)

## Component Hierarchy

```
RootLayout
├── CartProvider
│   ├── Navbar
│   │   ├── Logo/Brand
│   │   ├── Shop Link
│   │   ├── Cart Link
│   │   └── Auth Section
│   │       ├── User Email (if logged in)
│   │       ├── Logout Button (if logged in)
│   │       └── Login/Signup Links (if not logged in)
│   └── Main Content
│       ├── Homepage
│       │   ├── Hero Section
│       │   ├── ProductCard (×6)
│       │   └── Categories Grid
│       ├── Shop Page
│       │   └── ProductCard (×12)
│       ├── Product Detail
│       │   ├── Product Image
│       │   ├── Product Info
│       │   ├── Add to Cart Button
│       │   └── Related Products (×3)
│       ├── Cart Page
│       │   ├── Cart Items List
│       │   │   └── CartItem (×N)
│       │   └── Order Summary
│       └── Auth Pages
│           ├── Signup Form
│           └── Login Form
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│              REACT CONTEXT - CartContext                     │
└─────────────────────────────────────────────────────────────┘
              ▲                                    │
              │ useCart() Hook                     │ Dispatch Actions
              │                                    ▼
              ├──────────────────────────────────────────
              │                                    
        Components:                    Functions:
        - ProductCard                  - addToCart()
        - Cart Page                    - removeFromCart()
        - Navbar Cart Link             - updateQuantity()
                                       - clearCart()
                                       
┌─────────────────────────────────────────────────────────────┐
│              FIREBASE - Authentication                       │
└─────────────────────────────────────────────────────────────┘
              ▲                                    │
              │ Auth State                        │ signUp/Login/Logout
              │                                    ▼
              ├──────────────────────────────────────────
              │                                    
        Components:                    Functions:
        - Navbar (user email)          - createUserWithEmailAndPassword()
        - Auth Pages                   - signInWithEmailAndPassword()
        - Cart Checkout                - signOut()
                                       
┌─────────────────────────────────────────────────────────────┐
│            LOCALSTORAGE - Cart Persistence                  │
└─────────────────────────────────────────────────────────────┘
              ▲                                    │
              │ Read on Load                      │ Write on Change
              │                                    ▼
              ├──────────────────────────────────────────
              │                                    
        CartContext                  Effect Hook:
        - Syncs state with            - useEffect() watches cart
          localStorage                - JSON.stringify/parse
```

## Data Structures

### Product Object
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}
```

### CartItem Object
```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
```

### User Object (Firebase)
```typescript
interface User {
  uid: string;
  email: string;
  passwordHash: string; // Stored securely in Firebase
  createdAt: timestamp;
}
```

### Order Object (Future)
```typescript
interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'shipped';
  createdAt: timestamp;
}
```

## API Endpoints (Future)

```
POST /api/checkout
- Request: { items: CartItem[], userId: string }
- Response: { sessionId: string } (Stripe)

POST /api/webhook/stripe
- Receives payment confirmation from Stripe
- Updates order status

GET /api/products
- Returns all products from Firestore

GET /api/orders/:userId
- Returns user's order history
```

## State Management Flow

```
User Action
    │
    ▼
Component Event
    │
    ├─► localStorage Update
    │       │
    │       ▼
    │   CartContext State Update
    │       │
    │       ▼
    │   Component Re-render
    │
    └─► Firebase Auth
        │
        ▼
    Auth State Update
        │
        ▼
    Navbar Re-render
```

## URL Routes

```
Public Routes (No Authentication)
├── GET  /                    # Homepage
├── GET  /shop                # Product catalog
├── GET  /product/:id         # Product details
├── GET  /cart                # Cart page
├── GET  /signup              # Sign up form
├── GET  /login               # Login form

Protected Routes (Authentication Required)
├── POST /api/checkout        # Initiate payment
├── GET  /profile             # User profile (Coming soon)
├── GET  /orders              # Order history (Coming soon)

Admin Routes (Future)
└── GET  /admin               # Admin dashboard
```

## Technology Stack Mapping

```
frontend UI Layer
    │
    ├─► Next.js (pages, routing, SSR)
    │
    ├─► React (components, hooks)
    │
    ├─► TypeScript (type safety)
    │
    └─► Tailwind CSS (styling)
    
state Management Layer
    │
    └─► React Context API (cart)
    
authentication Layer
    │
    └─► Firebase Auth (users)
    
data Layer
    │
    ├─► localStorage (cart persistence)
    │
    ├─► Firestore (future: products, users, orders)
    │
    └─► Stripe (payments)
    
delivery Layer
    │
    └─► Vercel (deployment)
```

## File Organization Rationale

```
/app                           # All pages and layouts
  ├── page.tsx               # Each route = one page
  └── [dynamic]/page.tsx      # Dynamic routes
  
/components                    # Reusable UI blocks
  ├── Navbar.tsx              # Navigation (used everywhere)
  └── ProductCard.tsx         # Product display card
  
/context                       # Shared state
  └── CartContext.tsx         # Global cart state
  
/lib                          # Configuration & utilities
  ├── firebase.ts            # Firebase setup
  └── stripe.ts              # Stripe setup
```

## Security Layers

```
┌────────────────────────────────────────┐
│  Environment Variables (.env.local)    │
├────────────────────────────────────────┤
│  - Firebase Keys      (private)        │
│  - Stripe Secret Key  (private)        │
│  - Stripe Public Key  (public)         │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  Authentication Layer (Firebase)        │
├────────────────────────────────────────┤
│  - Email/Password validation           │
│  - Secure session management           │
│  - HTTPS enforcement                   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  Authorization Layer (Future)          │
├────────────────────────────────────────┤
│  - User role verification              │
│  - Protected API routes                │
│  - Order ownership validation          │
└────────────────────────────────────────┘
```

## Performance Considerations

```
Optimization Strategy:
├── Image Optimization
│   └── Next.js Image component (future)
├── Code Splitting
│   └── Next.js automatic code splitting
├── Caching
│   ├── Browser cache (static assets)
│   ├── localStorage (cart data)
│   └── React Query (future API caching)
└── Monitoring
    └── Vercel Analytics (future)
```

---

**This site map represents the complete architecture and will guide Phase 2-8 implementation.**
