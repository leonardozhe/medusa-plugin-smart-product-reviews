import ProductReview from "../models/product-review"

export default {
  Product: {
    primaryKey: "id",
    linkable: true,
  },
  Customer: {
    primaryKey: "id",
    linkable: true,
  },
}
