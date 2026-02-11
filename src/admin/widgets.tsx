import { Container, Heading, Text, Badge } from "@medusajs/ui"
import { type DetailWidgetProps } from "@medusajs/framework/types"
import { useQuery } from "@tanstack/react-query"
import { Star } from "@medusajs/icons"
import React from "react"

// Widget configuration types
interface WidgetConfig {
  id: string
  zone: string[]
  component: React.ComponentType<DetailWidgetProps>
}

/**
 * Product Reviews Widget
 * 
 * Displays product reviews summary on the product details page.
 * 
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export function ProductReviewsWidget({ 
  data,
  notify
}: DetailWidgetProps) {
  const productId = data?.id

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: async () => {
      // Fetch reviews for this product
      const response = await fetch(`/admin/product-reviews?product_id=${productId}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    },
    enabled: !!productId
  })

  if (isLoading) {
    return <div className="text-center py-4">Loading reviews...</div>
  }

  const reviewCount = reviews?.count || 0
  const averageRating = reviews?.average_rating || 0

  return (
    <Container>
      <div className="flex items-center justify-between mb-2">
        <Heading level="h3">Product Reviews</Heading>
        <Badge color="blue">{reviewCount} reviews</Badge>
      </div>
      
      {reviewCount > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Text className="text-lg font-semibold">{averageRating.toFixed(1)}</Text>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "text-orange-400"
                      : "text-gray-200"
                  }`}
                  filled={star <= Math.round(averageRating)}
                />
              ))}
            </div>
          </div>
          <Text size="small" className="text-gray-500">
            Average rating based on customer feedback
          </Text>
        </div>
      ) : (
        <Text size="small" className="text-gray-500">
          No reviews yet. Encourage customers to leave reviews!
        </Text>
      )}
    </Container>
  )
}

/**
 * Product Review Requests Widget
 * 
 * Displays review request status for the product.
 * 
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export function ProductReviewRequestsWidget({ 
  data,
  notify
}: DetailWidgetProps) {
  const productId = data?.id

  const { data: requests, isLoading } = useQuery({
    queryKey: ["product-review-requests", productId],
    queryFn: async () => {
      const response = await fetch(`/admin/product-review-requests?product_id=${productId}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    },
    enabled: !!productId
  })

  if (isLoading) {
    return <div className="text-center py-4">Loading requests...</div>
  }

  const pendingCount = requests?.filter((r: any) => r.status === "pending")?.length || 0

  return (
    <Container>
      <div className="flex items-center justify-between mb-2">
        <Heading level="h3">Review Requests</Heading>
        {pendingCount > 0 && (
          <Badge color="orange">{pendingCount} pending</Badge>
        )}
      </div>
      
      <Text size="small" className="text-gray-500">
        {requests?.length || 0} review requests sent for this product
      </Text>
    </Container>
  )
}

/**
 * Product Reviews List Component
 * 
 * Displays a list of product reviews.
 */
export function ProductReviewsList({ productId }: { productId: string }) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["product-reviews-list", productId],
    queryFn: async () => {
      const response = await fetch(`/admin/product-reviews?product_id=${productId}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    }
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <Container>
      <Heading level="h3" className="mb-4">Product Reviews</Heading>
      {reviews?.reviews?.length > 0 ? (
        <div className="space-y-4">
          {reviews.reviews.map((review: any) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Text className="font-semibold">{review.title}</Text>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? "text-orange-400" : "text-gray-200"
                      }`}
                      filled={star <= review.rating}
                    />
                  ))}
                </div>
              </div>
              <Text size="small">{review.content}</Text>
              {review.created_at && (
                <Text size="x-small" className="text-gray-500 mt-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </Text>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Text>No reviews found.</Text>
      )}
    </Container>
  )
}

/**
 * Product Review Details Component
 * 
 * Displays details of a single review.
 */
export function ProductReviewDetails({ reviewId }: { reviewId: string }) {
  const { data: review, isLoading } = useQuery({
    queryKey: ["product-review-detail", reviewId],
    queryFn: async () => {
      const response = await fetch(`/admin/product-reviews/${reviewId}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
    }
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <Container>
      <Heading level="h3" className="mb-4">Review Details</Heading>
      {review && (
        <div className="space-y-4">
          <div>
            <Heading level="h3">{review.title}</Heading>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= review.rating ? "text-orange-400" : "text-gray-200"
                  }`}
                  filled={star <= review.rating}
                />
              ))}
            </div>
          </div>
          <Text>{review.content}</Text>
          {review.images && review.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {review.images.map((image: any, index: number) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

// Export widgets configuration for Medusa Admin
export const widgets: WidgetConfig[] = [
  {
    id: "product-reviews-widget",
    zone: ["product.details.after"],
    component: ProductReviewsWidget,
  },
  {
    id: "product-review-requests-widget",
    zone: ["product.details.after"],
    component: ProductReviewRequestsWidget,
  },
]
