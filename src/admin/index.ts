/**
 * Product Reviews Admin Extension
 *
 * Provides admin UI components for managing product reviews.
 * Compatible with Medusa v2 Admin SDK.
 *
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
import { widgets } from "./widgets";

export default {
  id: "product-reviews-admin",
  label: "Product Reviews",
  
  // Custom routes
  routes: [
    {
      path: "/reviews",
      label: "Product Reviews",
      component: () => import("./routes").then(m => m.productReviewsRoute)
    },
    {
      path: "/review-requests",
      label: "Review Requests",
      component: () => import("./routes").then(m => m.productReviewRequestsRoute)
    }
  ],

  // Menu items
  menuItems: [
    {
      label: "Product Reviews",
      path: "/reviews",
      icon: "Stars"
    },
    {
      label: "Review Requests",
      path: "/review-requests",
      icon: "Envelope"
    }
  ],

  // Widgets for product details page
  widgets
}
