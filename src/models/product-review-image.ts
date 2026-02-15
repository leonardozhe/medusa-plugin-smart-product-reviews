import { model } from "@medusajs/framework/utils"

const ProductReviewImage = model.define("product-review-image", {
  id: model.id().primaryKey(),
  review_id: model.text(),
  url: model.text(),
  alt_text: model.text().nullable(),
  created_at: model.dateTime(),
})

export default ProductReviewImage
