'use client'
import React, { useState } from 'react';
import { Input, Button, Rating } from '../../';
import { cn } from '../../utils/cn';
import type { CommentFormProps } from './Comments.types';

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  onCancel,
  placeholder = 'Write a comment…',
  loading = false,
  autoFocus = false,
  initialValue = '',
  showRating = false,
  ratingValue = 0,
  onRatingChange,
  className,
}) => {
  const [content, setContent] = useState(initialValue);
  const [rating, setRating] = useState(ratingValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim(), showRating ? rating : undefined);
      setContent('');
      setRating(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-3', className)}>
      {showRating && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Rating</span>
          <Rating
            value={rating}
            onChange={onRatingChange || setRating}
            size="sm"
            color="warning"
          />
        </div>
      )}
      <div className="flex gap-2">
        <Input
          as="textarea"
          placeholder={placeholder}
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          disabled={loading}
          autoFocus={autoFocus}
          className="flex-1 rounded-xl min-h-[80px] resize-y"
          rows={3}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={loading || !content.trim()}
          loading={loading}
        >
          Post
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};