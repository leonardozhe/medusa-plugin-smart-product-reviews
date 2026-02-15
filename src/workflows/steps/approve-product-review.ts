import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"

export const approveProductReviewStep = createStep(
  "approve-product-review",
  async (input: any, { container }): Promise<StepResponse<any, any>> => {
    const productReviewService = container.resolve("productReviewService") as any
    
    const review = await productReviewService.list({ id: input.id })

    if (review.length === 0) {
      throw new Error(`Product review with id ${input.id} not found`)
    }

    if (review[0].status === "approved") {
      return new StepResponse(review[0], { id: review[0].id })
    }

    const updated = await productReviewService.update(input.id, {
      status: "approved",
    })

    return new StepResponse(updated, { id: review[0].id, previousStatus: review[0].status })
  },
  async (rollbackData: any, { container }) => {
    if (!rollbackData) return

    const productReviewService = container.resolve("productReviewService") as any
    await productReviewService.update(rollbackData.id, {
      status: rollbackData.previousStatus,
    })
  }
)
