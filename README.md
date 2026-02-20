# Medusa Plugin: Product Reviews

A product reviews plugin for Medusa v2.13+, featuring review moderation, image support, and data models for custom implementation.

## Features

- ✅ Customer product reviews with 1-5 star ratings
- ✅ Review moderation (pending, approved, rejected) status tracking
- ✅ Review images support
- ✅ Helpful count and report functionality
- ✅ Soft delete support

## Installation

1. Install from GitHub:

```bash
npm install git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git#v1.0.0
```

Or use pnpm/yarn:

```bash
pnpm add git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git#v1.0.0
# or
yarn add git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git#v1.0.0
```

2. Add to your `medusa.config.ts`:

```typescript
import { defineConfig } from "@medusajs/framework/utils"

export default defineConfig({
  modules: {
    "product-review": {
      resolve: "medusa-plugin-smart-product-reviews",
    },
  },
})
```

## Data Models

This plugin provides the following data models:

### ProductReview

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key |
| product_id | string | Related product ID |
| customer_id | string \| null | Customer ID (null for guests) |
| rating | number | Rating 1-5 |
| title | string | Review title |
| content | string | Review content |
| status | enum | "pending", "approved", "rejected" |
| rejection_reason | string \| null | Reason for rejection |
| helpful_count | number | Number of helpful votes |
| reported_count | number | Number of times reported |
| created_at | Date | Creation timestamp |
| updated_at | Date | Last update timestamp |
| deleted_at | Date \| null | Soft delete timestamp |

### ProductReviewImage

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key |
| review_id | string | Related review ID |
| url | string | Image URL |
| alt_text | string \| null | Alt text for accessibility |
| created_at | Date | Creation timestamp |

### ProductReviewRequest

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key |
| product_id | string | Related product ID |
| customer_id | string | Customer ID |
| requested_at | Date | When review was requested |
| status | enum | "pending", "fulfilled" |

## Usage

Medusa v2.13 automatically generates services for your data models. You can use the generated service directly:

```typescript
// Access the generated service
const productReviewService = container.resolve("product-review")

// Create a review
const review = await productReviewService.create({
  product_id: "prod_123",
  customer_id: "cus_456",
  rating: 5,
  title: "Great product!",
  content: "Very happy with my purchase.",
  status: "pending",
  helpful_count: 0,
  reported_count: 0,
})

// List reviews
const [reviews, count] = await productReviewService.listAndCount(
  { product_id: "prod_123" },
  { skip: 0, take: 10 }
)

// Update review status
await productReviewService.update(review.id, {
  status: "approved",
})

// Delete a review
await productReviewService.delete(review.id)
```

## Implementation Notes

This is a **data models only** plugin for Medusa v2.13. The framework automatically generates:

1. **Services** - Full CRUD operations for all models
2. **API Routes** - Can be defined in your main application
3. **Database Migrations** - Auto-generated from model definitions

To add custom API routes, define them in your main application's route files and use the generated `product-review` service.

## Compatibility

- Medusa v2.13+
- Node.js 20+
- TypeScript 5.6+

## License

MIT
