import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"

export const deleteProductReviewStep = createStep(
  "delete-product-review",
  async (input: any, { container }): Promise<StepResponse<any, any>> => {
    const productReviewService = container.resolve("productReviewService") as any
    
    const review = await productReviewService.list({ id: input.id })

    if (review.length === 0) {
      throw new Error(`Product review with id ${input.id} not found`)
    }

    await productReviewService.remove(input.id)

    return new StepResponse({ id: input.id }, { reviewData: review[0] })
  },
  async (rollbackData: any, { container }) => {
    if (!rollbackData) return

    const productReviewService = container.resolve("productReviewService") as any
    await productReviewService.create(rollbackData.reviewData)
  }
)
