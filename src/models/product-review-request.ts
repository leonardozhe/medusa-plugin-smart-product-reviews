import { model } from "@medusajs/framework/utils"

const ProductReviewRequest = model.define("product-review-request", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  customer_id: model.text(),
  requested_at: model.dateTime(),
  status: model.enum(["pending", "fulfilled"]),
})

export default ProductReviewRequest
