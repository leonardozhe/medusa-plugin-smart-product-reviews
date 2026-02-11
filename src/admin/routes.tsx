import { Container, Heading, Button, toast } from "@medusajs/ui"
import { useQuery, useMutation } from "@tanstack/react-query"
import React from "react"
import { ProductReviewsList } from "./widgets"

/**
 * Product Reviews Route
 * 
 * Main route for viewing and managing product reviews.
 * 
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export const productReviewsRoute = {
  path: "/reviews",
  label: "Reviews",
  icon: "star",
  component: () => <ProductReviewsPage />,
  children: [
    {
      path: "/reviews/:id",
      component: () => <ProductReviewDetailPage />
    }
  ]
}

function ProductReviewsPage() {
  const { data: reviews, isLoading, refetch } = useQuery({
    queryKey: ["all-product-reviews"],
    queryFn: async () => {
      const response = await fetch("/admin/product-reviews", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    }
  })

  const approveMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`/admin/product-reviews/${reviewId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    },
    onSuccess: () => {
      toast.success("Review approved successfully")
      refetch()
    },
    onError: () => {
      toast.error("Failed to approve review")
    }
  })

  const rejectMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`/admin/product-reviews/${reviewId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    },
    onSuccess: () => {
      toast.success("Review rejected successfully")
      refetch()
    },
    onError: () => {
      toast.error("Failed to reject review")
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`/admin/product-reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    },
    onSuccess: () => {
      toast.success("Review deleted successfully")
      refetch()
    },
    onError: () => {
      toast.error("Failed to delete review")
    }
  })

  const handleDelete = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteMutation.mutate(reviewId)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <Heading level="h2">Product Reviews</Heading>
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>

      {reviews?.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review: any) => (
                <tr key={review.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{review.product?.title || "Unknown"}</td>
                  <td className="px-4 py-3">{review.title}</td>
                  <td className="px-4 py-3">{review.rating}/5</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      review.status === "approved" 
                        ? "bg-green-100 text-green-800"
                        : review.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {review.created_at 
                      ? new Date(review.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {review.status === "pending" && (
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="primary"
                          size="small"
                          onClick={() => approveMutation.mutate(review.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => rejectMutation.mutate(review.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No reviews found.</p>
        </div>
      )}
    </Container>
  )
}

function ProductReviewDetailPage() {
  // Implementation for detail view
  return (
    <Container>
      <Heading level="h2">Review Details</Heading>
    </Container>
  )
}

/**
 * Product Review Requests Route
 * 
 * Route for viewing and managing review requests.
 * 
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export const productReviewRequestsRoute = {
  path: "/review-requests",
  label: "Review Requests",
  icon: "envelope",
  component: () => <ProductReviewRequestsPage />
}

function ProductReviewRequestsPage() {
  const { data: requests, isLoading } = useQuery({
    queryKey: ["product-review-requests"],
    queryFn: async () => {
      const response = await fetch("/admin/product-review-requests", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    }
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading requests...</div>
  }

  return (
    <Container>
      <Heading level="h2" className="mb-6">Review Requests</Heading>

      {requests?.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Customer Email</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request: any) => (
                <tr key={request.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{request.product?.title || "Unknown"}</td>
                  <td className="px-4 py-3">{request.customer_email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      request.status === "completed" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {request.created_at 
                      ? new Date(request.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No review requests found.</p>
        </div>
      )}
    </Container>
  )
}
