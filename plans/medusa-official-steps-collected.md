# Medusa 评论功能开发 - 官方步骤收集

> 收集自 Medusa 官方文档的评论功能开发步骤
> 用户已安装 Medusa，从第二部分开始收集

---
## 已收集内容

---

### Step 2: Add Product Review Module

In Medusa, you can build custom features in a module. A module is a reusable package with functionalities related to a single feature or domain. Medusa integrates the module into your application without implications or side effects on your setup.

In the module, you define the data models necessary for a feature and the logic to manage these data models. Later, you can build commerce flows around your module.

In this step, you'll build a Product Review Module that defines the necessary data models to store and manage product reviews.

#### Create Module Directory

A module is created under the src/modules directory of your Medusa application. So, create the directory src/modules/product-review.

#### Create Data Models

A data model represents a table in the database. You create data models using Medusa's Data Model Language (DML). It simplifies defining a table's columns, relations, and indexes with straightforward methods and configurations.

For the Product Review Module, you need to define a Review data model that represents a product review. So, create the file src/modules/product-review/models/review.ts:

```typescript
// src/modules/product-review/models/review.ts
import { model } from "@medusajs/framework/utils"

const Review = model.define("review", {
  id: model.id().primaryKey(),
  title: model.text().nullable(),
  content: model.text(),
  rating: model.float(),
  first_name: model.text(),
  last_name: model.text(),
  status: model.enum(["pending", "approved", "rejected"]).default("pending"),
  product_id: model.text().index("IDX_REVIEW_PRODUCT_ID"),
  customer_id: model.text().nullable(),
})
.checks([
  {
    name: "rating_range",
    expression: (columns) => `${columns.rating} >= 1 AND ${columns.rating} <= 5`,
  },
])

export default Review
```

**Review Data Model Properties:**
- `id`: A unique ID for the review.
- `title`: The review's title.
- `content`: The review's content.
- `rating`: The review's rating (1-5, with check constraint).
- `first_name`: The first name of the reviewer.
- `last_name`: The last name of the reviewer.
- `status`: The review's status (pending, approved, rejected).
- `product_id`: The ID of the product the review is for.
- `customer_id`: The ID of the customer who submitted the review.

#### Create Module's Service

To create the Review Module's service, create the file src/modules/product-review/service.ts:

```typescript
// src/modules/product-review/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import Review from "./models/review"

class ProductReviewModuleService extends MedusaService({
  Review,
}) {
}

export default ProductReviewModuleService
```

The ProductReviewModuleService extends MedusaService which generates CRUD methods for data models.

#### Export Module Definition

Create the file src/modules/product-review/index.ts:

```typescript
// src/modules/product-review/index.ts
import { Module } from "@medusajs/framework/utils"
import ProductReviewModuleService from "./service"

export const PRODUCT_REVIEW_MODULE = "productReview"

export default Module(PRODUCT_REVIEW_MODULE, {
  service: ProductReviewModuleService,
})
```

#### Add Module to Medusa's Configurations

In medusa-config.ts, add the modules property:

```typescript
// medusa-config.ts
module.exports = defineConfig({
  // ...
  modules: [
    {
      resolve: "./src/modules/product-review",
    },
  ],
})
```

---

### Generate Migrations

Since data models represent tables in the database, you define how they're created in the database with migrations. A migration is a TypeScript or JavaScript file that defines database changes made by a module.

Generate a migration for the Review Module:

```bash
npx medusa db:generate productReview
```

You'll now have a migrations directory under src/modules/product-review that holds the generated migration.

Then, to reflect these migrations on the database:

```bash
npx medusa db:migrate
```

The table for the Review data model is now created in the database.

---

### Step 3: Define Review <> Product Link

Medusa integrates modules into your application without implications or side effects by isolating modules from one another. This means you can't directly create relationships between data models in your module and data models in other modules.

Instead, Medusa provides the mechanism to define links between data models, and retrieve and manage linked records while maintaining module isolation.

Create the file src/links/review-product.ts:

```typescript
// src/links/review-product.ts
import { defineLink } from "@medusajs/framework/utils"
import ProductReviewModule from "../modules/product-review"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  {
    linkable: ProductReviewModule.linkable.review,
    field: "product_id",
    isList: false,
  },
  ProductModule.linkable.product,
  {
    readOnly: true,
  }
)
```

The defineLink function accepts three parameters:
1. An object indicating the first data model part of the link (Review).
2. An object indicating the second data model part of the link (Product).
3. An optional object with additional configurations (readOnly: true means no link table is created).

---

### Step 4: Create Review Workflow

A workflow is a series of queries and actions, called steps, that complete a task. You construct a workflow like you construct a function, but it's a special function that allows you to track its executions' progress, define roll-back logic, and configure other advanced features.

The workflow will have the following steps:
1. `useQueryGraphStep` - Validate product exists (provided by Medusa)
2. `createReviewStep` - Create the review (custom step)

#### createReviewStep

Create the file src/workflows/steps/create-review.ts:

```typescript
// src/workflows/steps/create-review.ts
import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { PRODUCT_REVIEW_MODULE } from "../../modules/product-review"
import ProductReviewModuleService from "../../modules/product-review/service"

export type CreateReviewStepInput = {
  title?: string
  content: string
  rating: number
  product_id: string
  customer_id?: string
  first_name: string
  last_name: string
  status?: "pending" | "approved" | "rejected"
}

export const createReviewStep = createStep(
  "create-review",
  async (input: CreateReviewStepInput, { container }) => {
    const reviewModuleService: ProductReviewModuleService = container.resolve(
      PRODUCT_REVIEW_MODULE
    )

    const review = await reviewModuleService.createReviews(input)

    return new StepResponse(review, review.id)
  },
  async (reviewId, { container }) => {
    if (!reviewId) {
      return
    }

    const reviewModuleService: ProductReviewModuleService = container.resolve(
      PRODUCT_REVIEW_MODULE
    )

    await reviewModuleService.deleteReviews(reviewId)
  }
)
```

Step parameters:
- Unique name: "create-review"
- Step function: receives input and container, returns StepResponse
- Compensation function: rollback logic (deletes review if workflow fails)

#### Add Module to Medusa's Configurations

In medusa-config.ts, add the modules property:

```typescript
// medusa-config.ts
module.exports = defineConfig({
  // ...
  modules: [
    {
      resolve: "./src/modules/product-review",
    },
  ],
})
```


