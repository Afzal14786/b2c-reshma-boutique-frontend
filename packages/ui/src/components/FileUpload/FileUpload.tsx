import React, { useState, useRef } from 'react';
import { Card } from '../Card';
import { cn } from '../../utils/cn';
import type { FileUploadProps } from './FileUpload.types';

// ─── Inline SVG Icons ──────────────────────────────────────────

const UploadIcon = ({ active }: { active: boolean }) => (
  <svg
    className={cn(
      'transition-colors duration-200',
      active ? 'text-secondary' : 'text-text-secondary/40 dark:text-text-secondary/30',
    )}
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  multiple = false,
  accept = 'image/*',
  maxFiles = 5,
  maxSizeMB = 5,
  className = '',
  size = 'md',
  compact = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    validateAndUpload(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    validateAndUpload(files);
  };

  const validateAndUpload = (files: File[]) => {
    const valid = files.filter((f) => {
      if (maxSizeMB && f.size > maxSizeMB * 1024 * 1024) {
        alert(`File ${f.name} exceeds ${maxSizeMB}MB`);
        return false;
      }
      return true;
    });
    if (valid.length) {
      onUpload(valid);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Size mapping
  const sizeMap = {
    sm: { padding: 'p-3', text: 'text-xs', iconSize: 24, btnSize: 'sm' },
    md: { padding: 'p-4', text: 'text-sm', iconSize: 32, btnSize: 'md' },
    lg: { padding: 'p-6', text: 'text-base', iconSize: 40, btnSize: 'lg' },
  };

  const sizeClasses = sizeMap[size] || sizeMap.md;
  const compactPadding = compact ? 'p-3' : sizeClasses.padding;

  return (
    <Card
      variant="glass"
      className={cn(
        'border-2 border-dashed transition-all duration-300 ease-out',
        dragActive
          ? 'border-secondary bg-secondary/5 shadow-[0_4px_20px_rgba(91,155,213,0.2)]'
          : 'border-glass-border hover:border-secondary/40',
        compactPadding,
        className,
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center gap-2">
        {/* Icon */}
        <UploadIcon active={dragActive} />

        {/* Primary text */}
        <p className={cn('text-text-secondary dark:text-text-secondary/80', sizeClasses.text)}>
          {dragActive
            ? 'Drop your files here'
            : 'Drag & drop or click to browse'}
        </p>

        {/* Helper text */}
        <p className={cn('text-text-secondary/50 dark:text-text-secondary/40', sizeClasses.text, 'text-[0.7rem]')}>
          {multiple ? `Up to ${maxFiles} files` : 'Single file'} • Max {maxSizeMB}MB each
        </p>

        {/* Hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        {/* Choose files button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'mt-1 px-4 py-1.5 bg-secondary text-text-inverse rounded-full font-medium',
            'hover:bg-secondary/80 hover:shadow-md',
            'transition-all duration-200 active:scale-[0.97]',
            sizeClasses.text,
          )}
        >
          Choose Files
        </button>
      </div>
    </Card>
  );
};