import { model } from "@medusajs/framework/utils"
import ProductReview from "./models/product-review"
import ProductReviewImage from "./models/product-review-image"
import ProductReviewRequest from "./models/product-review-request"

export default {
  id: "product-review",
  models: [ProductReview, ProductReviewImage, ProductReviewRequest],
}
