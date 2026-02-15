import { DAL } from "@medusajs/framework/types"

export class ProductReviewService {
  protected baseRepository_: any

  constructor({ baseRepository }: { baseRepository: any }) {
    this.baseRepository_ = baseRepository
  }

  async list(filters: any = {}): Promise<any[]> {
    return await this.baseRepository_.find(filters)
  }

  async create(data: any): Promise<any> {
    if (data.rating < 1 || data.rating > 5) {
      throw new Error("Rating must be between 1 and 5")
    }

    const review = await this.baseRepository_.create([
      {
        ...data,
        status: "pending",
        helpful_count: 0,
        reported_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])

    return review[0]
  }

  async update(id: string, data: any): Promise<any> {
    const updated = await this.baseRepository_.update(
      [{ id }],
      {
        ...data,
        updated_at: new Date(),
      }
    )

    return updated[0]
  }

  async remove(id: string): Promise<void> {
    await this.baseRepository_.delete([{ id }])
  }
}

export class ProductReviewImageService {
  protected baseRepository_: any

  constructor({ baseRepository }: { baseRepository: any }) {
    this.baseRepository_ = baseRepository
  }

  async create(data: any): Promise<any> {
    const images = await this.baseRepository_.create([
      {
        ...data,
        created_at: new Date(),
      }
    ])

    return images[0]
  }

  async remove(id: string): Promise<void> {
    await this.baseRepository_.delete([{ id }])
  }
}

export class ProductReviewRequestService {
  protected baseRepository_: any

  constructor({ baseRepository }: { baseRepository: any }) {
    this.baseRepository_ = baseRepository
  }

  async create(data: any): Promise<any> {
    const requests = await this.baseRepository_.create([
      {
        ...data,
        status: "pending",
        requested_at: new Date(),
      }
    ])

    return requests[0]
  }
}
