# 🛒 E-Commerce Microservices

Spring Boot + Kafka + Redis + MongoDB + MySQL + Eureka

---

## Architecture

```
Client
  └── API Gateway :8080  (Spring Cloud Gateway + Eureka client)
        ├── /api/users/**    → User Service    :8081  (MySQL + Redis)
        ├── /api/products/** → Product Service :8082  (MongoDB + Redis cache)
        ├── /api/cart/**     → Cart Service    :8083  (Redis only)
        └── /api/orders/**   → Order Service   :8084  (MySQL + Kafka producer)

Eureka Server :8761  — service registry (all services register here)

Kafka Topics:
  order.placed      → consumed by: inventory, payment, notification
  order.confirmed   → consumed by: notification
  order.cancelled   → consumed by: inventory (release stock)
  payment.done      → consumed by: order-service (confirm/cancel)

Databases:
  MySQL    → users, orders, order_items
  MongoDB  → products, reviews
  Redis    → cart (TTL), session, JWT blacklist, product cache
```

---

## Project Structure

```
ecommerce/
├── docker-compose.yml
├── init-mysql.sql
├── pom.xml                    ← parent pom
├── eureka-server/             ← Service registry (port 8761)
├── api-gateway/               ← Routes + logging filter (port 8080)
├── user-service/              ← Auth, JWT, profiles (port 8081)
├── product-service/           ← Catalog, search, reviews (port 8082)
├── cart-service/              ← Redis cart operations (port 8083)
└── order-service/             ← Orders + Kafka events (port 8084)
```

---

## Quick Start

### Option 1 — Docker Compose (Recommended)

```bash
# Clone / copy project
cd ecommerce

# Sab kuch ek command mein start karo
docker-compose up --build -d

# Logs dekho
docker-compose logs -f
```

### Option 2 — Local Development

**Step 1: Infrastructure start karo**
```bash
# Sirf DBs + Kafka + Eureka start karo
docker-compose up mysql mongodb redis zookeeper kafka eureka-server -d
```

**Step 2: Har service alag terminal mein**
```bash
# Terminal 1
cd user-service && mvn spring-boot:run

# Terminal 2
cd product-service && mvn spring-boot:run

# Terminal 3
cd cart-service && mvn spring-boot:run

# Terminal 4
cd order-service && mvn spring-boot:run

# Terminal 5
cd api-gateway && mvn spring-boot:run
```

---

## Service URLs

| Service         | URL                          | Direct Port |
|-----------------|------------------------------|-------------|
| API Gateway     | http://localhost:8080        | —           |
| Eureka Dashboard| http://localhost:8761        | —           |
| User Service    | http://localhost:8081        | direct      |
| Product Service | http://localhost:8082        | direct      |
| Cart Service    | http://localhost:8083        | direct      |
| Order Service   | http://localhost:8084        | direct      |

> **Eureka login:** admin / admin123

---

## API Examples (use via Gateway :8080)

### User Service

```bash
# Register
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul Sharma","email":"rahul@example.com","password":"rahul123"}'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@example.com","password":"rahul123"}'

# Profile
curl http://localhost:8080/api/users/1/profile

# Logout (JWT blacklist in Redis)
curl -X POST http://localhost:8080/api/users/logout \
  -H "Authorization: Bearer <token>"
```

### Product Service

```bash
# All top-rated products
curl http://localhost:8080/api/products/top-rated

# Search
curl "http://localhost:8080/api/products/search?keyword=iphone&page=0&size=5"

# By category
curl "http://localhost:8080/api/products/category/smartphones?page=0&size=10"

# Single product (Redis cached after first hit)
curl http://localhost:8080/api/products/<product-id>

# Create product (admin)
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "OnePlus 12",
    "description": "Flagship killer with Snapdragon 8 Gen 3",
    "price": 64999,
    "stock": 75,
    "category": "smartphones",
    "brand": "OnePlus"
  }'

# Add review
curl -X POST http://localhost:8080/api/products/<product-id>/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "userName": "Rahul",
    "rating": 5,
    "title": "Excellent product!",
    "comment": "Best phone I have used. Camera is superb."
  }'
```

### Cart Service

```bash
# Add item to cart (stored in Redis with 24h TTL)
curl -X POST http://localhost:8080/api/cart/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "<product-id>",
    "productName": "iPhone 15 Pro",
    "price": 134900,
    "quantity": 1,
    "imageUrl": "https://example.com/iphone15pro.jpg"
  }'

# Get cart
curl http://localhost:8080/api/cart/1

# Cart summary
curl http://localhost:8080/api/cart/1/summary

# Update quantity
curl -X PUT "http://localhost:8080/api/cart/1/items/<product-id>?quantity=2"

# Remove item
curl -X DELETE http://localhost:8080/api/cart/1/items/<product-id>

# Clear cart
curl -X DELETE http://localhost:8080/api/cart/1
```

### Order Service

```bash
# Place order (triggers Kafka event: order.placed)
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "shippingAddress": "42, MG Road, Lucknow, UP 226001",
    "items": [
      {
        "productId": "<product-id>",
        "productName": "iPhone 15 Pro",
        "quantity": 1,
        "price": 134900
      }
    ]
  }'

# User orders (paginated)
curl "http://localhost:8080/api/orders/user/1?page=0&size=10"

# Single order
curl "http://localhost:8080/api/orders/1?userId=1"

# Update status (admin/shipping)
curl -X PUT http://localhost:8080/api/orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"SHIPPED"}'

# Cancel order
curl -X DELETE "http://localhost:8080/api/orders/1/cancel?userId=1"
```

---

## Redis Data Patterns

```
cart:{userId}              → Cart object (Hash, TTL 24h)
session:{userId}           → JWT token (String, TTL 24h)
blacklist:{token}          → "1" (String, TTL = token remaining time)
products::{productId}      → Product JSON (TTL 10 min, Spring Cache)
product-list::{category}_0 → Page<Product> JSON (TTL 5 min)
top-rated::SimpleKey []    → List<Product> JSON (TTL 30 min)
```

---

## Kafka Flow

```
1. POST /api/orders  →  Order saved (PENDING)  →  order.placed published
2. Payment service consumes order.placed  →  charges payment
3. Payment service publishes payment.done (SUCCESS/FAILED)
4. Order service consumes payment.done:
   - SUCCESS → order.status = CONFIRMED, order.confirmed published
   - FAILED  → order.status = CANCELLED
5. Notification service consumes order.confirmed → sends email/SMS
```

---

## Eureka Service Discovery

```
Eureka Dashboard: http://localhost:8761
Login: admin / admin123

Services registered:
  - API-GATEWAY
  - USER-SERVICE
  - PRODUCT-SERVICE
  - CART-SERVICE
  - ORDER-SERVICE

Gateway uses lb://service-name (load balanced via Eureka)
No hardcoded IPs needed!
```

---

## Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| Framework        | Spring Boot 3.2, Spring Cloud 2023  |
| Service Registry | Netflix Eureka                      |
| API Gateway      | Spring Cloud Gateway                |
| Message Broker   | Apache Kafka 7.5                    |
| Cache            | Redis 7.2 (cart + Spring Cache)     |
| DB (users/orders)| MySQL 8.0 + JPA/Hibernate           |
| DB (products)    | MongoDB 7.0 + Spring Data           |
| Auth             | JWT (HS256) + BCrypt                |
| Resilience       | Kafka RetryableTopic + DLQ          |
| Containers       | Docker + Docker Compose             |

---

## Common Issues

**Eureka not showing services?**
- Wait 30 seconds after start — services need time to register
- Check: `curl http://admin:admin123@localhost:8761/eureka/apps`

**MongoDB auth error?**
- Make sure `?authSource=admin` is in the URI

**Kafka consumer not starting?**
- Kafka takes ~20 seconds to be ready. Docker healthcheck handles this.

**Redis connection refused?**
- Check password in application.yml matches docker-compose `--requirepass`
