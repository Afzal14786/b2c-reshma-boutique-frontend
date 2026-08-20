'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react';
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

const RemoveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Object URLs for image previews — created fresh whenever the
  // selection changes, and revoked on the next change / unmount so
  // they don't leak for the lifetime of the page.
  const previews = useMemo(
    () => selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [selectedFiles],
  );

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

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

  const validateAndUpload = (incoming: File[]) => {
    const valid = incoming.filter((f) => {
      if (maxSizeMB && f.size > maxSizeMB * 1024 * 1024) {
        alert(`File ${f.name} exceeds ${maxSizeMB}MB`);
        return false;
      }
      return true;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (!valid.length) return;

    setSelectedFiles((prev) => {
      const combined = multiple ? [...prev, ...valid] : valid;
      if (combined.length > maxFiles) {
        alert(`You can upload up to ${maxFiles} file${maxFiles === 1 ? '' : 's'}.`);
      }
      const next = combined.slice(0, maxFiles);
      onUpload(next);
      return next;
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      onUpload(next);
      return next;
    });
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
    <div className={cn('space-y-3', className)}>
      <Card
        variant="glass"
        className={cn(
          'border-2 border-dashed transition-all duration-300 ease-out',
          dragActive
            ? 'border-secondary bg-secondary/5 shadow-[0_4px_20px_rgba(91,155,213,0.2)]'
            : 'border-glass-border hover:border-secondary/40',
          compactPadding,
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <UploadIcon active={dragActive} />

          <p className={cn('text-text-secondary dark:text-text-secondary/80', sizeClasses.text)}>
            {dragActive ? 'Drop your files here' : 'Drag & drop or click to browse'}
          </p>

          <p className={cn('text-text-secondary/50 dark:text-text-secondary/40', sizeClasses.text, 'text-[0.7rem]')}>
            {multiple ? `Up to ${maxFiles} files` : 'Single file'} • Max {maxSizeMB}MB each
            {multiple && selectedFiles.length > 0 && ` • ${selectedFiles.length}/${maxFiles} selected`}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="hidden"
          />

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

      {/* Preview grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {previews.map(({ file, url }, index) => (
            <div key={`${file.name}-${file.lastModified}-${index}`} className="relative">
              <img
                src={url}
                alt={file.name}
                className="w-full aspect-square object-cover rounded-btn border border-glass-border"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-error text-white shadow-md hover:bg-error/80 transition-colors duration-200"
                aria-label={`Remove ${file.name}`}
              >
                <RemoveIcon />
              </button>
              <p className="mt-1 text-[0.65rem] text-text-secondary truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};