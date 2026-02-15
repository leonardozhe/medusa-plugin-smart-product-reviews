export interface ProductReview {
  id: string
  product_id: string
  customer_id: string | null
  rating: number
  title: string
  content: string
  status: "pending" | "approved" | "rejected"
  rejection_reason: string | null
  helpful_count: number
  reported_count: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export interface ProductReviewImage {
  id: string
  review_id: string
  url: string
  alt_text: string | null
  created_at: Date
}

export interface ProductReviewRequest {
  id: string
  product_id: string
  customer_id: string
  requested_at: Date
  status: "pending" | "fulfilled"
}

export interface CreateProductReviewInput {
  product_id: string
  customer_id?: string | null
  title: string
  content: string
  rating: number
  image_urls?: string[]
}

export interface ReviewStats {
  average_rating: number
  total_reviews: number
  rating_distribution: Record<number, number>
}
