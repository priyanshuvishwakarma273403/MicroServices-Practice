# 🛒 ShopKart Frontend

> Modern e-commerce frontend built with **React 18 + Vite + Tailwind CSS** — Flipkart-inspired UI with a cleaner, premium feel.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat&logo=tailwindcss)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=flat&logo=redux)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## ✨ Features

- 🎨 Flipkart-inspired modern UI with smooth animations
- 🔐 JWT authentication with auto token refresh
- 🛍️ Real-time cart synced with backend (Redis)
- 🔍 Live search with debounce + recent searches
- 📦 Full order flow — cart → checkout → order tracking
- 📱 Fully responsive — mobile, tablet, desktop
- ⚡ Skeleton loaders, toast notifications, empty states
- 🧩 Redux Toolkit for global state management

---

## 🖼️ Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero banner, categories, deals, top-rated |
| Product List | `/products` | Filters, sort, pagination |
| Product Detail | `/products/:id` | Images, specs, reviews, buy now |
| Search Results | `/search?q=` | Live search results |
| Cart | `/cart` | Items, qty update, order summary |
| Checkout | `/checkout` | Address → payment stepper |
| Orders | `/orders` | Order history + tracking |
| Login | `/login` | Split-screen auth |
| Register | `/register` | Sign up form |

---

## 🏗️ Project Structure

```
shopkart-frontend/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── api/
│   │   ├── axiosInstance.js      ← Axios + JWT interceptor
│   │   ├── userApi.js            ← login, register, profile
│   │   ├── productApi.js         ← catalog, search, category
│   │   ├── cartApi.js            ← cart CRUD
│   │   └── orderApi.js           ← place order, history
│   │
│   ├── store/
│   │   ├── index.js              ← Redux store
│   │   ├── authSlice.js          ← user + token state
│   │   ├── cartSlice.js          ← cart items + totals
│   │   └── uiSlice.js            ← loading + toasts
│   │
│   ├── hooks/
│   │   ├── useAuth.js            ← auth helpers
│   │   ├── useCart.js            ← cart with optimistic updates
│   │   └── useToast.js           ← toast notifications
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        ← sticky blue navbar + search
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── common/
│   │   │   ├── ProductCard.jsx   ← card with hover animation
│   │   │   ├── RatingStars.jsx   ← half-star support
│   │   │   ├── Spinner.jsx
│   │   │   ├── Toast.jsx         ← slide-in notifications
│   │   │   ├── EmptyState.jsx    ← friendly empty screens
│   │   │   └── Pagination.jsx
│   │   ├── home/
│   │   │   ├── HeroBanner.jsx    ← auto-sliding carousel
│   │   │   ├── CategoryBar.jsx
│   │   │   ├── DealOfDay.jsx     ← countdown timer
│   │   │   └── TopRated.jsx
│   │   └── cart/
│   │       ├── CartItem.jsx
│   │       └── OrderSummary.jsx
│   │
│   └── pages/
│       ├── HomePage.jsx
│       ├── ProductListPage.jsx   ← sidebar filters + sort
│       ├── ProductDetailPage.jsx ← 2-col layout + reviews
│       ├── SearchResultsPage.jsx
│       ├── CartPage.jsx          ← 70/30 split layout
│       ├── CheckoutPage.jsx      ← 4-step stepper
│       ├── OrdersPage.jsx
│       ├── LoginPage.jsx         ← split-screen design
│       └── RegisterPage.jsx
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend running at `http://localhost:8080` ([see backend repo](../ecommerce/))

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/shopkart-frontend.git
cd shopkart-frontend

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env and set VITE_API_URL

# 4. Start dev server
npm run dev
```

App will be available at **http://localhost:5173**

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
# API Gateway URL (backend)
VITE_API_URL=http://localhost:8080

# App name (shown in browser tab)
VITE_APP_NAME=ShopKart
```

> ⚠️ Never commit `.env` to Git. `.env.example` is safe to commit.

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| Vite | 5.0 | Build tool + dev server |
| Tailwind CSS | 3.3 | Utility-first styling |
| Redux Toolkit | 2.0 | Global state management |
| React Router | 6.20 | Client-side routing |
| Axios | 1.6 | HTTP client + interceptors |
| Lucide React | 0.294 | Icons |
| React Hot Toast | 2.4 | Toast notifications |
| Plus Jakarta Sans | — | Heading font (Google Fonts) |
| DM Sans | — | Body font (Google Fonts) |

---

## 🎨 Design System

```js
// Colors
primary:   '#2874F0'   // Flipkart blue
accent:    '#FF6161'   // Sale red
success:   '#26A541'   // Green
warning:   '#FF9F00'   // Orange / Buy Now
page-bg:   '#F1F3F6'   // Grey background
card:      '#FFFFFF'   // Card background
text:      '#212121'   // Primary text
muted:     '#878787'   // Secondary text
border:    '#E0E0E0'   // Borders

// Fonts
heading:   'Plus Jakarta Sans'
body:      'DM Sans'

// Shadows
card:       '0 1px 8px rgba(0,0,0,0.08)'
card-hover: '0 4px 20px rgba(0,0,0,0.14)'
```

---

## 🔌 API Integration

All requests go through **API Gateway at port 8080**, which routes to individual microservices.

```
Frontend (5173)
    └── API Gateway (8080)
          ├── /api/users/**    → User Service (8081)
          ├── /api/products/** → Product Service (8082)
          ├── /api/cart/**     → Cart Service (8083)
          └── /api/orders/**   → Order Service (8084)
```

### Auth Flow

```
1. User logs in → POST /api/users/login
2. Backend returns JWT token
3. Token saved in localStorage ('auth_token')
4. Axios interceptor attaches: Authorization: Bearer <token>
5. On 401 response → clear token → redirect /login
6. On logout → POST /api/users/logout (blacklist in Redis) → clear localStorage
```

### Key API Calls

```js
// Login
POST /api/users/login
{ email, password } → { accessToken, userId, name, role }

// Products
GET /api/products/top-rated
GET /api/products/search?keyword=iphone&page=0&size=10
GET /api/products/category/smartphones?page=0&size=10
GET /api/products/:id

// Cart (requires auth)
GET    /api/cart/:userId
POST   /api/cart/:userId/items       { productId, productName, price, quantity }
PUT    /api/cart/:userId/items/:pid  ?quantity=2
DELETE /api/cart/:userId/items/:pid
DELETE /api/cart/:userId             ← clear after order

// Orders (requires auth)
POST /api/orders                     { userId, shippingAddress, items[] }
GET  /api/orders/user/:userId
GET  /api/orders/:orderId?userId=1
```

---

## 🗂️ State Management

### Redux Store Shape

```js
{
  auth: {
    user: { id, name, email, role } | null,
    token: "eyJ..." | null,
    isLoggedIn: false
  },
  cart: {
    items: [{ productId, productName, price, quantity, imageUrl }],
    totalAmount: 0,
    totalItems: 0
  },
  ui: {
    isLoading: false,
    toast: { message, type } | null
  }
}
```

### LocalStorage Keys

```
auth_token        → JWT token string
user_info         → JSON { id, name, email, role }
recent_searches   → JSON array of last 5 search strings
```

---

## 🧩 Component Details

### Navbar
- Sticky blue navbar with shadow on scroll
- Search bar with 300ms debounce + dropdown suggestions
- Recent searches from localStorage
- Cart icon with animated red badge
- Login button → redirect to `/login`
- Logged-in: "Hello, {name}" → dropdown (Profile, Orders, Logout)

### ProductCard
- Hover: `translateY(-2px)` + stronger shadow (200ms)
- Click "Add to Cart": scale animation + API call + Redux update
- Indian rupee format: `₹1,34,900`
- 2-line product name clamp
- Green discount percentage

### HeroBanner
- Auto-slides every 3 seconds
- Manual arrows (pause auto-slide for 5s after click)
- CSS `translate-x` transition (no library)
- Dot indicators at bottom

### DealOfDay
- Countdown timer: updates every second with `setInterval`
- Clears interval on component unmount
- Horizontal scroll with hidden scrollbar

### Skeleton Loaders
```jsx
// Shimmer animation on loading
<div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded h-48 w-full" />
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Screen | Product Grid | Layout |
|---|---|---|---|
| `sm` | < 640px | 1 column | Stack everything |
| `md` | 640–768px | 2 columns | Condensed navbar |
| `lg` | 768–1024px | 3 columns | Sidebar as drawer |
| `xl` | > 1024px | 4 columns | Full sidebar visible |

---

## 🛠️ Available Scripts

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint check
npm run lint
```

---

## 🔗 Related Repositories

| Repo | Description |
|---|---|
| [shopkart-backend](../ecommerce/) | Spring Boot microservices — User, Product, Cart, Order |
| [shopkart-frontend](.) | This repo — React + Tailwind frontend |

---

## 📁 Backend Services (must be running)

| Service | Port | Start |
|---|---|---|
| MySQL | 3306 | `docker-compose up mysql` |
| MongoDB | 27017 | `docker-compose up mongodb` |
| Redis | 6379 | `docker-compose up redis` |
| Kafka | 29092 | `docker-compose up kafka zookeeper` |
| Eureka | 8761 | `cd eureka-server && mvn spring-boot:run` |
| API Gateway | 8080 | `cd api-gateway && mvn spring-boot:run` |
| User Service | 8081 | `cd user-service && mvn spring-boot:run` |
| Product Service | 8082 | `cd product-service && mvn spring-boot:run` |
| Cart Service | 8083 | `cd cart-service && mvn spring-boot:run` |
| Order Service | 8084 | `cd order-service && mvn spring-boot:run` |

Or start everything with: `docker-compose up --build -d`

---

## 🐛 Common Issues

**CORS error on API calls?**
```
Backend application.yml mein CORS allow karo:
spring.cloud.gateway.globalcors.cors-configurations.'[/**]'.allowedOrigins: http://localhost:5173
```

**Cart not loading?**
- Check if user is logged in (token in localStorage)
- Verify cart-service is running on port 8083

**Products not showing?**
- Product-service port 8082 running hai?
- MongoDB connected? Check: `docker-compose logs mongodb`

**Images broken?**
- ProductCard mein fallback image set karo:
```jsx
<img onError={(e) => e.target.src = '/placeholder.png'} />
```

---

## 🗺️ Roadmap

- [ ] Wishlist / Save for later
- [ ] Product comparison
- [ ] Advanced filters (color, size)
- [ ] Order tracking map
- [ ] Dark mode toggle
- [ ] PWA support (offline cart)
- [ ] Razorpay payment integration
- [ ] Admin dashboard

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ using React + Spring Boot

⭐ **Star this repo if it helped you!** ⭐

</div>
