import { 
  MedusaRequest, 
  MedusaResponse,
  AuthenticatedMedusaRequest,
} from "@medusajs/framework"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const productReviewRequestService = req.scope.resolve("productReviewRequestService") as any
  
  const requests = await productReviewRequestService.list({})
  
  res.json({ product_review_requests: requests })
}
