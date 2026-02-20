# Medusa Product Reviews Plugin

一个完整的 Medusa 2.13 商品评论功能插件，支持评论创建、审核和管理。

## 功能特性

- ✅ 商品评论创建（需要客户登录）
- ✅ 评论审核功能（管理员批准/拒绝）
- ✅ 评论删除功能（通过工作流回滚）
- ✅ Admin 评论列表管理页面
- ✅ Store API 获取商品已批准评论
- ✅ 评论平均评分计算

## 安装

### 1. 将插件复制到 Medusa 项目中

将 `src` 目录的内容复制到你的 Medusa 项目的 `src` 目录中。

### 2. 配置 medusa-config.ts

在 `medusa-config.ts` 中添加模块配置：

```typescript
module.exports = defineConfig({
  // ...
  modules: [
    {
      resolve: "./src/modules/product-review",
    },
  ],
})
```

### 3. 生成并运行数据库迁移

```bash
npx medusa db:generate productReview
npx medusa db:migrate
```

### 4. 重新启动服务器

```bash
npm run dev
```

## API 路由

### Store API

#### POST /store/reviews
创建商品评论（需要客户认证）

**请求体头**:
- `x-publishable-api-key`: Publishable API Key
- `Authorization`: Bearer Token

**请求体**:
```json
{
  "title": "string (optional)",
  "content": "string (required)",
  "rating": "number (1-5, required)",
  "product_id": "string (required)",
  "first_name": "string (required)",
  "last_name": "string (required)"
}
```

#### GET /store/products/:id/reviews
获取指定商品的已批准评论列表

**查询参数**:
- `limit`: 每页数量（默认: 10）
- `offset`: 偏移量（默认: 0）
- `order`: 排序（默认: -created_at）

**响应**:
```json
{
  "reviews": [...],
  "count": "number",
  "limit": "number",
  "offset": "number",
  "average_rating": "number"
}
```

### Admin API

#### GET /admin/reviews
获取所有评论列表（需要管理员认证）

#### POST /admin/reviews/status
批准或拒绝评论（批量操作）

**请求体**:
```json
{
  "ids": ["string"],
  "status": "approved | rejected | pending"
}
```

## 数据模型

### Review

| 字段 | 类型 | 描述 |
|------|------|------|
| id | string | 唯一标识符（主键） |
| title | string? | 评论标题（可选） |
| content | string | 评论内容（必填） |
| rating | number | 评分（1-5，带约束） |
| first_name | string | 评论者名 |
| last_name | string | 评论者姓 |
| status | enum | 状态：pending/approved/rejected |
| product_id | string | 关联商品 ID（带索引） |
| customer_id | string? | 客户 ID（可选） |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

## 文件结构

```
src/
├── modules/
│   └── product-review/
│       ├── models/
│       │   └── review.ts
│       ├── service.ts
│       └── index.ts
├── links/
│   └── review-product.ts
├── workflows/
│   ├── create-review.ts
│   ├── update-review.ts
│   └── steps/
│       ├── create-review.ts
│       └── update-review.ts
├── api/
│   ├── store/
│   │   ├── reviews/route.ts
│   │   └── products/[id]/reviews/route.ts
│   ├── admin/
│   │   ├── reviews/route.ts
│   │   └── reviews/status/route.ts
│   └── middlewares.ts
└── admin/
    ├── lib/sdk.ts
    └── routes/reviews/page.tsx
```

## 测试

### 1. 创建测试客户

```bash
# 获取注册令牌
curl -X POST 'http://localhost:9000/auth/customer/emailpass/register' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "password123"
  }'

# 注册客户
curl -X POST 'http://localhost:9000/store/customers' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -H 'x-publishable-api-key: {api_key}' \
  --data-raw '{
    "email": "test@example.com"
  }'

# 获取认证令牌
curl -X POST 'http://localhost:9000/auth/customer/emailpass' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. 创建评论

```bash
curl --location 'http://localhost:9000/store/reviews' \
  --header 'x-publishable-api-key: {api_key}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "product_id": "{product_id}",
    "title": "Really good",
    "content": "The material is nice",
    "rating": 5,
    "first_name": "John",
    "last_name": "Smith"
  }'
```

### 3. 管理员审核评论

```bash
curl -X POST 'http://localhost:9000/admin/reviews/status' \
  -H 'Authorization: Bearer {admin_token}' \
  -H 'Content-Type: application/json' \
  --data '{
    "ids": ["{review_id}"],
{    "status": "approved"
  }'
```

## License

MIT
