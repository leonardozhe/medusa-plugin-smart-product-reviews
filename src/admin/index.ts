/**
 * Product Reviews Admin Extension
 *
 * Provides admin UI components for managing product reviews.
 * Compatible with Medusa v2 Admin SDK.
 *
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export default {
  id: "product-reviews-admin",
  label: "Product Reviews",
  
  // Widget definitions for product details page
  widgets: [
    {
      id: "product-reviews-widget",
      zone: ["product.details.after"],
      component: () => import("./widgets").then(m => m.ProductReviewsWidget)
    },
    {
      id: "product-review-requests-widget",
      zone: ["product.details.after"],
      component: () => import("./widgets").then(m => m.ProductReviewRequestsWidget)
    }
  ],

  // Custom routes
  routes: [
    {
      path: "/reviews",
      component: () => import("./routes").then(m => m.productReviewsRoute)
    },
    {
      path: "/review-requests",
      component: () => import("./routes").then(m => m.productReviewRequestsRoute)
    }
  ],

  // Menu items
  menuItems: [
    {
      label: "Product Reviews",
      path: "/reviews",
      icon: "star"
    },
    {
      label: "Review Requests",
      path: "/review-requests",
      icon: "envelope"
    }
  ]
}
