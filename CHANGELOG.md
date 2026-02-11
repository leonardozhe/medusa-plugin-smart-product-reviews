# Changelog

All notable changes to this project will be documented in this file.

## [0.0.34] - 2025-02-11

### Fixed
- Disabled admin extension (export default null) to test if this resolves widgets error
- Backend plugin functionality remains intact

## [0.0.33] - 2025-02-11

### Fixed
- Disabled admin extension (export default null) to isolate white screen issue
- Backend plugin functionality remains intact

## [0.0.32] - 2025-02-11

### Fixed
- Fixed tsconfig.json to exclude medusa-config.js and package.json from build
- This prevented incorrect compilation output and admin extension loading issues

## [0.0.31] - 2025-02-11

### Fixed
- Added empty widgets array to admin/index.ts to satisfy Medusa Admin v2 requirements

## [0.0.30] - 2025-02-11

### Fixed
- Temporarily removed widgets export from admin/index.ts to isolate white screen issue
- Routes and menu items will be restored first to ensure basic functionality

## [0.0.29] - 2025-02-11

### Fixed
- Fixed admin white screen issue by properly exporting'widgets array in admin/index.ts
- Widgets are now correctly imported and exported in the default admin extension object

## [0.0.28] - 2025-02-11

### Fixed
- Simplified admin config by removing widgets array (moved to widgets.tsx)

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
