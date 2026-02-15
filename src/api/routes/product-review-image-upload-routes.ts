import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const imageUrls: string[] = []
    
    res.status(201).json({
      images: imageUrls,
      message: "Image uploaded successfully",
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
