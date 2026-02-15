import { model } from "@medusajs/framework/utils"

const ProductReview = model.define("product-review", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  customer_id: model.text().nullable(),
  rating: model.number(),
  title: model.text(),
  content: model.text(),
  status: model.enum(["pending", "approved", "rejected"]),
  rejection_reason: model.text().nullable(),
  helpful_count: model.number().default(0),
  reported_count: model.number().default(0),
  created_at: model.dateTime(),
  updated_at: model.dateTime(),
  deleted_at: model.dateTime().nullable(),
})

export default ProductReview
