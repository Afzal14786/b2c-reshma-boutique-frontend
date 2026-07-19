export interface FileUploadProps {
  /** Callback when files are uploaded */
  onUpload: (files: File[]) => void;
  /** Allow multiple file selection (default: false) */
  multiple?: boolean;
  /** Accepted file types (default: 'image/*') */
  accept?: string;
  /** Maximum number of files (default: 5) */
  maxFiles?: number;
  /** Maximum file size in MB (default: 5) */
  maxSizeMB?: number;
  /** Additional CSS classes */
  className?: string;
  /** Size variant – controls padding and font size (default: md) */
  size?: 'sm' | 'md' | 'lg';
  /** Show a compact version with less padding (default: false) */
  compact?: boolean;
}