# Reshma Boutique – E‑Commerce Platform (Frontend)

> **Monorepo** for the Reshma Boutique B2C storefront + admin dashboard.  
> Built with Next.js, Turborepo, Tailwind CSS, and a shared UI kit.

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)
![Turborepo](https://img.shields.io/badge/Turborepo-2.0-000?style=flat&logo=turborepo)
![pnpm](https://img.shields.io/badge/pnpm-9.0-orange?style=flat&logo=pnpm)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![Zod](https://img.shields.io/badge/Zod-4.0-3E6B9B?style=flat&logo=zod)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.81-EC5990?style=flat)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?style=flat)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.263-563D7C?style=flat)

---

## Repository Structure

```text
reshma-platform/
├── apps/
│ ├── storefront/ # Customer-facing Next.js app (port 3000)
│ │ ├── app/ # App Router pages (home, products, cart, checkout, account)
│ │ ├── components/ # Storefront-specific components
│ │ └── public/ # Static assets
│ │
│ └── dashboard/ # Admin panel (port 3001)
│ ├── app/ # App Router (login, dashboard, products, orders, users, settings)
│ ├── components/ # Dashboard-specific components (ProductList, ProductForm, etc.)
│ ├── contexts/ # AuthContext, etc.
│ └── middleware.ts # Auth & route protection
│
├── packages/
│ ├── shared/ # Shared utilities, API client, types, config
│ │ ├── src/
│ │ │ ├── api/ # API clients for each module (products, auth, users, orders, etc.)
│ │ │ ├── config/ # Constants (API_BASE_URL, pagination defaults)
│ │ │ ├── hooks/ # Custom React hooks
│ │ │ ├── lib/ # Utility functions (date formatting, etc.)
│ │ │ └── types/ # Shared TypeScript interfaces (User, Product, etc.)
│ │
│ ├── ui/ # Reusable component library
│ │ ├── src/
│ │ │ ├── components/ # Buttons, Input, Form, Card, Modal, DataTable, Toast, etc.
│ │ │ ├── hooks/ # useTheme, useToast, etc.
│ │ │ ├── styles/ # Global CSS, Tailwind imports
│ │ │ └── utils/ # cn, etc.
│ │
│ ├── config-eslint/ # Shared ESLint configuration
│ └── config-typescript/ # Shared TypeScript configuration
│
├── tooling/
│ └── tailwind/ # Shared Tailwind preset (design tokens, glass styles)
│
├── package.json # Root dependencies, workspaces
├── pnpm-workspace.yaml # Workspace definition
├── turbo.json # Turborepo pipeline configuration
└── README.md
```  

## Quick Start

### 1. Prerequisites

- **Node.js** v20+ (recommended)
- **pnpm** v9+
- **Docker** (optional, for running the backend locally)

### 2. Clone & Install

```bash
git clone https://github.com/Afzal14786/b2c-reshma-boutique-frontend.git frontend
cd frontend
npm install
``` 

### 3. Environment Variables  

> Copy the example environment files for each app:  
```bash
# For the storefront
cp apps/storefront/.env.example apps/storefront/.env.local

# For the dashboard
cp apps/dashboard/.env.example apps/dashboard/.env.local
```  
Set the required variables (minimum):  

```env
# apps/dashboard/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```  

> The backend API URL should point to your running `reshma-core` instance.  

### 4. Run in Development  

```bash
# Start all apps (storefront + dashboard) with Turborepo
pnpm run dev

# Or run individually:
pnpm run dev --filter=storefront
pnpm run dev --filter=dashboard
```  
- **Storefront:** `http://localhost:3000`
- **Dashboard:** `http://localhost:3001`

### 5. Build for Production  

```bash
pnpm build
```  
The output will be in `apps/*/.next` for each app.  

---  

## Key Features

### Storefront

- Product catalog with polymorphic types (Bangles, Apparel, Fabric, Innerwear, Accessories)
- Typesense-powered search with typo‑tolerance & faceted filtering
- Shopping cart with coupon application
- Secure checkout with Razorpay integration
- User authentication (register, login, OTP verification, Google OAuth)
- Wishlist, product reviews, order history, returns

### Dashboard (Admin)

- Product management (CRUD) with dynamic forms for each product type
- Order management (view, update status, dispatch via Shiprocket)
- User management, coupon creation, support tickets
- Analytics dashboard (revenue, top products, etc.)

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Starts both apps in development mode with Turborepo |
| `pnpm build` | Builds all apps and packages |
| `pnpm lint` | Lints all workspaces |
| `pnpm typecheck` | Runs TypeScript type checking across all workspaces |
| `pnpm test` | (Not yet implemented) |
| `pnpm clean` | Removes `node_modules` and build artifacts |

---

## Backend Integration

This frontend relies on the **Reshma Core** backend API.  
Make sure the backend is running and the `NEXT_PUBLIC_API_URL` points to it.

The backend provides:

- Two‑token JWT authentication (access in memory + refresh HttpOnly cookie)
- RESTful endpoints for all modules (products, orders, users, etc.)
- Webhooks for Razorpay and Shiprocket
- Typesense search engine

> **Note:** The backend repository is private. Contact the team for access.

---

## Architecture Principles

- **Monorepo with Turborepo** – shared code, unified tooling.
- **Next.js App Router** – server components, route groups, layouts.
- **Tailwind CSS with shared preset** – consistent design tokens and glass‑morphism styles.
- **React Hook Form + Zod** – type‑safe, dynamic form validation.
- **Axios with interceptors** – automatic token refresh and response unwrapping.
- **HttpOnly refresh cookies** – secure, XSS‑proof session management.

---

## Development Notes

- **Adding a new product type** – extend the `productTypeConfig` in `packages/shared` and the backend DTOs.
- **Styling** – use the shared Tailwind preset; avoid custom CSS unless necessary.
- **API calls** – import from `@repo/shared/api` and use the typed client.
- **UI components** – import from `@repo/ui`; they are automatically tree‑shaken.

---

## License

All rights reserved. Proprietary code for Reshma Boutique.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit with conventional commit messages.
4. Open a pull request describing the change.