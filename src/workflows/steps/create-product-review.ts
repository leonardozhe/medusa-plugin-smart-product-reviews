import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"

export const createProductReviewStep = createStep(
  "create-product-review",
  async (input: any, { container }): Promise<StepResponse<any, any>> => {
    const productReviewService = container.resolve("productReviewService") as any
    
    const review = await productReviewService.create(input)

    return new StepResponse(review, { reviewId: review.id })
  },
  async (data: any, { container }) => {
    const productReviewService = container.resolve("productReviewService") as any
    await productReviewService.remove(data.reviewId)
  }
)
