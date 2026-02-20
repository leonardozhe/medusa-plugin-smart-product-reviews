# Medusa Product Reviews Plugin

A complete product review plugin for Medusa 2.13, supporting review creation, moderation, and management.

## Features

- ✅ Product review creation (requires customer authentication)
- ✅ Review moderation (admin approve/reject)
- ✅ Review deletion (via workflow compensation)
- ✅ Admin review list management page
- ✅ Store API to fetch approved product reviews
- ✅ Review average rating calculation

## Installation

### 1. Copy the plugin to your Medusa project

Copy the contents of the `src` directory to the `src` directory of your Medusa project.

### 2. Configure medusa-config.ts

Add the module configuration in `medusa-config.ts`:

```typescript
module.exports = defineConfig({
  // ...
  modules: [
    {
      resolve: "./src/modules/product-review",
",
    },
  ],
})
```

### 3. Generate and run database migrations

```bash
npx medusa db:generate productReview
npx medusa db:migrate
```

### 4. Restart the server

```bash
npm run dev
```

## API Routes

### Store API

#### POST /store/reviews
Create a product review (requires customer authentication)

**Request Headers**:
- `x-publishable-api-key`: Publishable API Key
- `Authorization`: Bearer Token

**Request Body**:
```json
{
  "title": "string (optional)",
  "content": "string (required)",
  "rating": "number (1-5, required)",
  "product_id": "string (required)",
  "first_name": "string (required)",
  "last_name": "string (required)"
}
```

#### GET /store/products/:id/reviews
Fetch approved reviews for a specific product

**Query Parameters**:
- `limit`: Number of items per page (default: 10)
- `offset`: Number of items to skip (default: 0)
- `order`: Sort order (default: -created_at)

**Response**:
```json
{
  "reviews": [...],
  "count": "number",
  "limit": "number",
  "offset": "number",
  "average_rating": "number"
}
```

### Admin API

#### GET /admin/reviews
Fetch all reviews (requires admin authentication)

#### POST /admin/reviews/status
Approve or reject reviews (batch operation)

**Request Body**:
```json
{
  "ids": ["string"],
  "status": "approved | rejected | pending"
}
```

## Data Model

### Review

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (primary key) |
| title | string? | Review title (optional) |
| content | string | Review content (required) |
| rating | number | Rating (1-5, with constraint) |
| first_name | string | Reviewer first name |
| last_name | string | Reviewer last name |
| status | enum | Status: pending/approved/rejected |
| product_id | string | Associated product ID (indexed) |
| customer_id | string? | Customer ID (optional) |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Update timestamp |

## File Structure

```
src/
├── modules/
│   └── product-review/
│       ├── models/
│       │   └── review.ts
│       ├── service.ts
│       └── index.ts
├── links/
│   └── review-product.ts
├── workflows/
│   ├── create-review.ts
│   ├── update-review.ts
│   └── steps/
│       ├── create-review.ts
│       └── update-review.ts
├── api/
│   ├── store/
│   │   ├── reviews/route.ts
│   │   └── products/[id]/reviews/route.ts
│   ├── admin/
│   │   ├── reviews/route.ts
│   │   └── reviews/status/route.ts
│   └── middlewares.ts
└── admin/
    ├── lib/sdk.ts
    └── routes/reviews/page.tsx
```

## Testing

### 1. Create a test customer

```bash
# Get registration token
curl -X POST 'http://localhost:9000/auth/customer/emailpass/register' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Register customer
curl -X POST 'http://localhost:9000/store/customers' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -H 'x-publishable-api-key: {api_key}' \
  --data-raw '{
    "email": "test@example.com"
  }'

# Get auth token
curl -X POST 'http://localhost:9000/auth/customer/emailpass' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Create a review

```bash
curl --location 'http://localhost:9000/store/reviews' \
  --header 'x-publishable-api-key: {api_key}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "product_id": "{product_id}",
    "title": "Really good",
    "content": "The material is nice",
    "rating": 5,
    "first_name": "John",
    "last_name": "Smith"
  }'
```

### 3. Admin moderate review

```bash
curl -X POST 'http://localhost:9000/admin/reviews/status' \
  -H 'Authorization: Bearer {admin_token}' \
  -H 'Content-Type: application/json' \
  --data '{
    "ids": ["{review_id}"],
    "status": "approved"
  }'
```

## License

MIT
