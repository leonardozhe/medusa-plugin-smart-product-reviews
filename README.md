# Medusa Plugin Product Reviews

A plugin that enables customer product reviews for Medusa v2.13+.

## Installation

```bash
yarn add @leonardozhe/medusa-plugin-product-reviews
```

## Configuration

Add to your `medusa.config.js`:

```javascript
module.exports = {
  plugins: [
    {
      resolve: "@leonardozhe/medusa-plugin-product-reviews",
      options: {
        auto_approve: false,
        max_images: 5
      }
    }
  ],
  admin: {
    extensions: [
      {
        resolve: "@leonardozhe/medusa-plugin-product-reviews/admin"
      }
    ]
  }
}
```

Run migrations:

```bash
yarn medusa migrations run
```

## API Routes

### Admin
- `GET /admin/product-reviews` - List all reviews
- `DELETE /admin/product-reviews/:id` - Delete a review
- `GET /admin/product-review-requests` - List review requests

### Store
- `GET /store/product-reviews` - List product reviews (public)
- `POST /store/product-reviews` - Create a review
- `POST /store/product-review-image-upload` - Upload review image

## License

MIT

## Repository

https://github.com/leonardozhe/medusa-plugin-product-reviews

---

Original author: Lambda Curry
