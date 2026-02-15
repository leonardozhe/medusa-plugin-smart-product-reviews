# Medusa Smart Product Reviews Plugin

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Medusa Version](https://img.shields.io/badge/Medusa-2.13%2B-brightgreen.svg)](https://docs.medusajs.com/v2)

A smart, high-performance product reviews plugin for Medusa v2.13+, featuring moderation, image support, and comprehensive admin management. Built with performance, aesthetics, and security in mind.

## Features

- ⭐ **1-5 Star Rating System** - Let customers rate products with an intuitive star rating
- 🔍 **Review Moderation** - Three-state moderation workflow (pending, approved, rejected)
- 📸 **Multi-Image Support** - Customers can attach multiple images to their reviews
- 📊 **Review Statistics** - Average ratings, review counts, and detailed metrics
- 🔒 **Security First** - Comprehensive permission controls, input validation, and XSS protection
- 🚀 **Performance Optimized** - Database indexing, query optimization, and caching
- 🎨 **Beautiful Admin UI** - Modern, responsive admin interface for review management
- 🔄 **Batch Operations** - Bulk approve, reject, or delete reviews

## Installation

### Using npm

```bash
npm install medusa-plugin-smart-product-reviews
```

### Using yarn

```bash
yarn add medusa-plugin-smart-product-reviews
```

### Using pnpm

```bash
pnpm add medusa-plugin-smart-product-reviews
```

## Configuration

### Backend Configuration

Add the plugin to your `medusa-config.ts`:

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

### Admin Configuration

The admin UI is automatically registered with Medusa's admin dashboard. Navigate to `/app/custom/reviews` to access the review management interface.

## Usage

### Creating a Review (Store API)

```bash
POST /store/product/product_reviews
```

```json
{
  "product_id": "prod_123",
  "customer_id": "cust_456",
  "title": "Great product!",
  "content": "I really loved this product. The quality is amazing and it arrived quickly.",
  "rating": 5,
  "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

### Listing Reviews (Store API)

```bash
GET /store/product/product_reviews?product_id=prod_123
```

Only approved reviews are returned to the storefront.

### Approving a Review (Admin API)

```bash
POST /admin/product/product_reviews/:id/approve
```

### Rejecting a Review (Admin API)

```bash
POST /admin/product/product_reviews/:id/reject
```

```json
{
  "rejection_reason": "Contains inappropriate content"
}
```

### Listing All Reviews (Admin API)

```bash
GET /admin/product/product_reviews
```

## API Routes

### Store Routes

| Method | Route | Description | Authentication |
|--------|-------|-------------|----------------|
| `GET` | `/store/product/product_reviews` | List product reviews (approved only) | Public |
| `POST` | `/store/product/product_reviews` | Create a new review | Customer |
| `POST` | `/store/product_reviews/image_upload` | Upload review image | Customer |

### Admin Routes

| Method | Route | Description | Authentication |
|--------|-------|-------------|----------------|
| `GET` | `/admin/product/product_reviews` | List all reviews | Admin |
| `POST` | `/admin/product/product_reviews/:id/approve` | Approve a review | Admin |
| `POST` | `/admin/product/product_reviews/:id/reject` | Reject a review | Admin |
| `DELETE` | `/admin/product/product_reviews/:id` | Delete a review | Admin |
| `GET` | `/admin/product_review_requests` | List review requests | Admin |

## Security Features

- **Permission Control**: All admin routes require admin authentication
- **Customer Authentication**: Review creation requires customer login
- **Input Validation**: All inputs validated using Zod schemas
- **XSS Protection**: User input properly escaped and sanitized
- **File Upload Security**: Image type and size validation
- **Rate Limiting**: Upload frequency controls

## Performance Optimizations

- **Database Indexing**: Optimized indexes on frequently queried fields
- **Query Optimization**: Efficient cross-module queries using Medusa's query system
- **Pagination**: List endpoints support pagination
- **Image Optimization**: Thumbnail generation and CDN support
- **Batch Operations**: Bulk approve/reject/delete functionality

## Development

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

4. Run in development mode:
```bash
npm run dev
```

## Architecture

This plugin follows Medusa v2.13+ best practices:

```
Frontend (Admin UI) → API Routes → Workflows → Module Services → Data Models
```

- **Data Models**: TypeORM entities with soft delete support
- **Module Services**: CRUD operations following Medusa's module pattern
- **Workflows**: Business logic with transaction support and rollback
- **API Routes**: HTTP interface with validation and authentication
- **Module Links**: Relationships to Product and Customer modules

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Copyright (c) 2025 leonardozhe

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Support

- **GitHub**: [https://github.com/leonardozhe/medusa-plugin-smart-product-reviews](https://github.com/leonardozhe/medusa-plugin-smart-product-reviews)
- **Issues**: [https://github.com/leonardozhe/medusa-plugin-smart-product-reviews/issues](https://github.com/leonardozhe/medusa-plugin-smart-product-reviews/issues)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
