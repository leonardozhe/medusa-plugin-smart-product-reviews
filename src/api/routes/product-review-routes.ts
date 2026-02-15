import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { z } from "zod"

const CreateProductReviewSchema = z.object({
  product_id: z.string(),
  customer_id: z.string().optional(),
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5),
  image_urls: z.array(z.string().url()).optional(),
})

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const validatedData = CreateProductReviewSchema.parse(req.body)
    
    const productReviewService = req.scope.resolve("productReviewService") as any
    
    const review = await productReviewService.create({
      ...validatedData,
      customer_id: validatedData.customer_id || (req as any).auth_context?.actor_id,
    })

    res.status(201).json({ product_review: review })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const query = req.scope.resolve("query") as any
    
    const filters: any = {
      status: "approved",
    }
    
    if (req.query.product_id) {
      filters.product_id = req.query.product_id
    }
    
    const reviews = await query.graph({
      entity: "product-review",
      fields: ["id", "rating", "title", "content", "created_at"],
      links: {
        "product-review-image": {
          fields: ["id", "url"],
        },
      },
      filters,
    })

    res.json({ product_reviews: reviews.data || reviews })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
