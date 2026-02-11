# Changelog

All notable changes to this project will be documented in this file.

## [0.0.27] - 2025-02-11

### Fixed
- Corrected admin index exports for widgets and routes
- Fixed route component references (productReviewsRoute, productReviewRequestsRoute)

## [0.0.26] - 2025-02-11

### Fixed
- Admin white screen caused by missing widgets array export
- Added proper widgets configuration for Medusa Admin

## [0.0.25] - 2025-02-11

### Added
- Image upload security checks: file type validation, size limits, filename sanitization
- Maximum file size limit: 5MB per file
- Maximum files per upload: 5 files
- Allowed image types: JPEG, PNG, GIF, WebP
- Path traversal attack prevention in filename handling

### Changed
- Updated README.md with Medusa v2.13+ configuration instructions
- Changed config file reference from `medusa-config.js` to `medusa-config.ts`
- Updated migration command from `yarn medusa migrations run` to `npx medusa db:migrate`
- Added documentation for review moderation feature

## [0.0.24] - 2025-02-11

### Added
- Review moderation system with status field (pending/approved/rejected)
- Admin API endpoints: `POST /admin/product-reviews/:id/approve` and `POST /admin/product-reviews/:id/reject`
- Admin UI approve/reject buttons in reviews table
- Storefront now only displays approved reviews

### Changed
- Updated @medusajs packages to v2.13+
- Relaxed @medusajs/ui version to ^4.0.0
- Flattened monorepo structure
- Created module.ts and plugin.ts for Medusa v2 ModuleProvider architecture

### Fixed
- Performance: Added Map-based lookups in product-review service
- Fixed division by zero bug when no reviews exist
- Fixed NaN return in stats calculation
