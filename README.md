# Medusa Plugin: Product Reviews

A comprehensive product reviews plugin for Medusa v2.13+, featuring review moderation, image support, and admin management capabilities.

## Features

- ✅ Customer product reviews with 1-5 star ratings
- ✅ Review moderation (pending, approved, rejected)
- ✅ Review images support
- ✅ Helpful count and report functionality
- ✅ Admin review management (approve/reject/delete)
- ✅ Storefront API for submitting and viewing reviews
- ✅ Admin API for managing reviews

## Installation

1. Install the plugin from GitHub:

```bash
npm install git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git#v1.0.0
```

Or use pnpm/yarn:

```bash
pnpm add git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git#v1.0.0
# or
yarn add git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git#v1.0.0
```

2. Add the plugin to your `medusa.config.ts`:

```typescript
import { defineConfig } from "@medusajs/framework/utils"
import { Modules } from "@medusajs/modules-sdk"

export default defineConfig({
  modules: {
    [Modules.PRODUCT_REVIEW]: {
      resolve: "medusa-plugin-smart-product-reviews",
    },
  },
})
```

3. Build the project:

```bash
npm run build
```

## Usage

### Storefront - Submit a Review

```typescript
import { createProductReviewWorkflow } from "medusa-plugin-smart-product-reviews"

const { result } = await createProductReviewWorkflow(container).run({
  input: {
    product_id: "prod_123",
    customer_id: "cus_456", // or null for guest reviews
    rating: 5,
    title: "Great product!",
    content: "Very happy with my purchase.",
  },
})
```

### Storefront - Get Reviews for a Product

```typescript
import { MODULE_KEY } from "medusa-plugin-smart-product-reviews"

const productReviewService = container.resolve(MODULE_KEY)
const [reviews, count] = await productReviewService.listAndCount(
  { product_id: "prod_123", status: "approved" },
  { skip: 0, take: 10 }
)
```

### Admin - Approve a Review

```typescript
import { approveProductReviewWorkflow } from "medusa-plugin-smart-product-reviews"

const { result } = await approveProductReviewWorkflow(container).run({
  input: { review_id: "review_123" },
})
```

### Admin - Reject a Review

```typescript
import { rejectProductReviewWorkflow } from "medusa-plugin-smart-product-reviews"

const { result } = await rejectProductReviewWorkflow(container).run({
  input: { 
    review_id: "review_123",
    rejection_reason: "Does not meet our review guidelines"
  },
})
```

### Admin - Delete a Review

```typescript
import { deleteProductReviewWorkflow } from "medusa-plugin-smart-product-reviews"

await deleteProductReviewWorkflow(container).run({
  input: { review_id: "review_123" },
})
```

## Data Models

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
|| alt_text | string \| null | Alt text for accessibility |
| created_at | Date | Creation timestamp |

### ProductReviewRequest

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key |
| product_id | string | Related product ID |
| customer_id | string | Customer ID |
| requested_at | Date | When review was requested |
| status | enum | "pending", "fulfilled" |

## Workflows

The plugin provides the following workflows:

- `createProductReviewWorkflow` - Create a new product review
- `approveProductReviewWorkflow` - Approve a pending review
- `rejectProductReviewWorkflow` - Reject a review with a reason
- `deleteProductReviewWorkflow` - Delete a review

Each workflow includes compensation logic for rollback on error.

## Services

The `ProductReviewService` extends `MedusaService` and provides:

- `create(data)` - Create new reviews
- `update(id, data)` - Update reviews
- `delete(id)` - Delete reviews
- `retrieve(id)` - Get a single review
- `list(filters)` - List reviews with filters
- `listAndCount(filters, options)` - List reviews with pagination

## Compatibility

- Medusa v2.13+
- Node.js 20+
- TypeScript 5.6+

## License

MIT
