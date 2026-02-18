# Medusa Smart Product Reviews Plugin

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Medusa Version](https://img.shields.io/badge/Medusa-2.13%2B-brightgreen.svg)](https://docs.medusajs.com/v2)

A modular product reviews plugin for Medusa v2.13+, providing data models for product reviews with star ratings, moderation workflow, and image support.

## Installation

```bash
npm install git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git
```

## Configuration

Add as a module in your `medusa-config.ts`:

```typescript
import { defineConfig } from "@medusajs/framework"

export default defineConfig({
  modules: [
    {
      resolve: "medusa-plugin-smart-product-reviews",
    },
  ],
})
```

## Data Models

### ProductReview

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `product_id` | string | Reference to product |
| `customer_id` | string | Reference to customer (optional) |
| `rating` | number | Star rating (1-5) |
| `title` | string | Review title |
| `content` | text | Review content |
| `status` | enum | pending | approved | rejected |
| `rejection_reason` | string | Reason for rejection (optional) |
| `helpful_count` | number | Number of helpful votes |
| `reported_count` | number | Number of reports |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |
| `deleted_at` | datetime | Soft delete timestamp |

### ProductReviewImage

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `review_id` | string | Reference to review |
| `url` | string | Image URL |
| `alt_text` | string | Alt text for accessibility |
| `created_at` | datetime | Creation timestamp |

### ProductReviewRequest

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `product_id` | string | Reference to product |
| `customer_id` | string | Reference to customer |
| `requested_at` | datetime | Request timestamp |
| `status` | enum | pending | fulfilled |

## License

Copyright (c) 2025 leonardozhe

Licensed under MIT License. See [LICENSE](LICENSE) for details.

## Support

- **GitHub**: [https://github.com/leonardozhe/medusa-plugin-smart-product-reviews](https://github.com/leonardozhe/medusa-plugin-smart-product-reviews)
- **Issues**: [https://github.com/leonardozhe/medusa-plugin-smart-product-reviews/issues](https://github.com/leonardozhe/medusa-plugin-smart-product-reviews/issues)
