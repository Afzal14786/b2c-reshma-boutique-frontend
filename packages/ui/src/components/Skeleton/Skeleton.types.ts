export type SkeletonVariant =
  | 'text'
  | 'rect'
  | 'circle'
  | 'card'
  | 'avatar'
  | 'button'
  | 'image';

export interface SkeletonProps {
  /** Visual variant (default: text) */
  variant?: SkeletonVariant;
  /** Width – can be a number (px) or CSS value/class (e.g., 'w-32', '200px') */
  width?: string | number;
  /** Height – can be a number (px) or CSS value/class (e.g., 'h-20', '100px') */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Enable shimmer animation (default: true) */
  shimmer?: boolean;
  /** Custom border radius (e.g., 'rounded-full', 'rounded-card') – overrides variant default */
  rounded?: string;
}