import ProductReview from "./models/product-review"
import ProductReviewImage from "./models/product-review-image"
import ProductReviewRequest from "./models/product-review-request"
import { 
  ProductReviewService, 
  ProductReviewImageService, 
  ProductReviewRequestService 
} from "./services/product-service-base"

export default {
  id: "product-review",
  models: [ProductReview, ProductReviewImage, ProductReviewRequest],
  services: [
    {
      className: ProductReviewService,
      alias: "productReviewService",
    },
    {
      className: ProductReviewImageService,
      alias: "productReviewImageService",
    },
    {
      className: ProductReviewRequestService,
      alias: "productReviewRequestService",
    },
  ],
}
