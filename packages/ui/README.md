# @repo/ui – Reshma Platform UI Components

A modern, glassy, and accessible component library built for the Reshma Boutique platform. Designed with Apple‑inspired aesthetics, full dark mode support, and responsive across all devices. Used by both the **admin dashboard** and the **customer storefront**.

---

## ✨ Features

- **Glassy Design** – Frosted glass effects with backdrop blur and subtle shadows.
- **Dark Mode** – Fully supported via CSS variables and a `.dark` class.
- **Responsive** – Mobile‑first, works on all screen sizes.
- **Accessible** – ARIA attributes, keyboard navigation, focus management.
- **Type‑Safe** – Written in TypeScript with strict typing.
- **Customisable** – Uses CSS variables for theming; can be extended via Tailwind.

---

## 📦 Installation

```bash
pnpm add @repo/ui
```  

> **Note:** This package is part of the Reshma monorepo and is intended to be used with pnpm workspaces. It assumes react, react-dom, and tailwindcss are already installed in your project.  

### 🚀 Usage  

Import any component directly from the package:  

```tsx
import { Button, Card, Input } from '@repo/ui';

function MyComponent() {
  return (
    <Card variant="glass">
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```  

### Styling  

The UI package uses Tailwind CSS and CSS variables. To use the styles, import them in your app's global CSS:  

```css
@import '@repo/ui/styles';
```  
Or, import individual style files if needed.  

## 🧩 Component List  

### Core / Primitives

| Component | Description |
|-----------|-------------|
| **Button** | Primary, secondary, outline, ghost, glass, and grayGlass variants with loading and icon support. |
| **Card** | Solid, glass, elevated, product, dashboard, and cover variants with subcomponents (Header, Title, Description, Content, Footer). |
| **Input** | Text input with label, error, helper text, and icon support. Can also be used as textarea or select. |
| **Search** | Glassy, debounced search input with clear button. |
| **Spinner** | Loading spinner with default and glass variants. |
| **Modal** | Dialog with header, body, footer; glass or solid; size variants. |
| **Avatar** | Image or fallback initials; glassy border support. |
| **Skeleton** | Loading placeholders for text, rect, circle, card, avatar, button, image. |
| **Badge** | Status labels with variants (primary, secondary, success, warning, error, info, ghost). |  

### Forms & Inputs  

| Component | Description |
|-----------|-------------|
| **Form** | Wrapper for react-hook-form with Zod validation. |
| **Checkbox** | With indeterminate state, label, size, and error support. |
| **Radio** | Individual radio button; use with RadioGroup for grouping. |
| **Switch** | Toggle switch with glassy styling and size variants. |
| **Select** | Dropdown with label, error, helper text, placeholder. |
| **Textarea** | Multi-line input with auto‑resize and character count. |
| **FileUpload** | Drag‑and‑drop file upload with glassy styling. |
| **DatePicker** | Calendar popover with single date selection. |
| **CouponInput** | Input + "Apply" button with validation states. |
| **LoginForm** | Pre‑built login form with email, password, and Google login. |
| **RegisterForm** | Pre‑built registration form with name, email, password, and Google login. |  

### Layout & Navigation  


| Component | Description |
|-----------|-------------|
| **Navbar** | Responsive navigation with brand, links, actions, and mobile menu. |
| **Sidebar** | Glassy sidebar for admin dashboard with navigation items. |
| **Footer** | Multi‑column footer with brand, links, social icons. |
| **Breadcrumb** | Navigation trail with custom separator. |
| **Tabs** | Tab navigation with underline, pill, boxed, and glass variants. |

### Feedback & Overlays  

| Component | Description |
|-----------|-------------|
| **Alert** | Status alerts with variants (success, error, warning, info) and dismissible option. |
| **Toast** | Toast notifications with auto‑dismiss and positioning. |
| **Tooltip** | Hover/focus tooltips with placement options. |
| **Popover** | Click‑triggered popovers with glassy content. |
| **Drawer** | Slide‑in panel from left, right, or bottom. |
| **Dropdown** | Menu with trigger, content, items, and separators. |  

### Data Display  

| Component | Description |
|-----------|-------------|
| **DataTable** | Sortable table with pagination, loading skeleton, and empty state. |
| **Pagination** | Page navigation with ellipsis and mobile‑friendly icons. |
| **StatusBadge** | Status labels for orders, payments, returns, tickets. |
| **Progress** | Progress bar with size variants and optional animation. |
| **MetricCard** | Dashboard metric card with icon and trend indicator. |
| **Price** | Price display with discount and sale badge. |
| **Rating** | Star rating (1‑5) with full/half support, interactive or read‑only. |
| **Comments** | Nested comment/reply system with likes and helpful votes. |
| **Review** | Product review with rating, title, content, and verified badge. |  

### Commerce  

| Component | Description |
|-----------|-------------|
| **ProductCard** | Product card with image carousel, wishlist, and add‑to‑cart. |
| **QuantitySelector** | Increment/decrement quantity with glassy styling. |
| **Cart** | Full cart component with items, summary, coupon input. |  

### Collapsible  

| Component | Description |
|-----------|-------------|
| **Accordion** | Collapsible sections with single/multiple open items. |

### Carousel  

| Component | Description |
|-----------|-------------|
| **Carousel** | Image/card carousel with auto‑play, loop, arrows, dots, and responsive slides per view. |  

### Steps  

| Component | Description |
|-----------|-------------|
| **Stepper** | Step indicator for multi‑step flows (checkout, onboarding). |  


## 🎨 Theming  

The UI package uses a set of CSS variables for theming. You can override them in your app's global CSS.  

```css
:root {
  --color-primary: #1e293b;
  --color-secondary: #3b82f6;
  --color-accent: #8b5cf6;
  /* ... see tokens.css for full list */
}

.dark {
  --color-primary: #f1f5f9;
  --color-secondary: #60a5fa;
  /* ... see dark theme in tokens.css */
}
```  

### Glass Utilities  

The `.glass` utility class provides the frosted glass effect:  

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
```  

## 🌙 Dark Mode  

Dark mode is supported via the `.dark` class on the `<html>` element. The UI package automatically adapts to the dark theme when this class is present.  

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```  

Or use the built‑in `ThemeProvider` and `useTheme` hook.  

```tsx
import { ThemeProvider, useTheme } from '@repo/ui';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function YourApp() {
  const { toggle } = useTheme();
  return <button onClick={toggle}>Toggle Theme</button>;
}
```  

## 📱 Responsive Design  

All components are built with a mobile‑first approach. Responsive behaviour is handled via Tailwind's `sm:`, `md:`, `lg:`, and `xl:` breakpoints. Components like `Pagination`, `Search`, `DataTable`, and `ProductCard` adapt seamlessly to all screen sizes.  

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in development mode
pnpm dev
```  

### Adding a new component  

- Create a folder in `src/components/ComponentName/`.
- Add `ComponentName.tsx`, `ComponentName.types.ts`, and `index.ts`.
- Export the component in `src/components/index.ts`.
- Add tests and stories (optional).

### 📄 License  

MIT © Reshma Boutique  

### 📧 Contact  

For questions or support, please contact the Reshma team.  

