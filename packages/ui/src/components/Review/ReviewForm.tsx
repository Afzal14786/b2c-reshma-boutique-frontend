import React, { useState } from 'react';
import { Input, Button, Rating } from '../../';
import { cn } from '../../utils/cn';
import type { ReviewFormProps } from './Review.types';

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  initialRating = 0,
  initialTitle = '',
  initialContent = '',
}) => {
  const [rating, setRating] = useState(initialRating);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && rating > 0) {
      onSubmit({ content: content.trim(), rating, title: title.trim() || undefined });
      setRating(0);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">Rating</label>
        <Rating value={rating} onChange={setRating} size="md" color="warning" />
        {rating === 0 && <p className="text-xs text-error mt-1">Please select a rating</p>}
      </div>

      <Input
        label="Title (optional)"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        placeholder="Summarize your experience"
        disabled={loading}
      />

      <Input
        as="textarea"
        label="Review"
        value={content}
        onChange={(e: any) => setContent(e.target.value)}
        placeholder="Tell us about your experience…"
        disabled={loading}
        rows={4}
        className="rounded-xl"
      />

      <div className="flex items-center gap-2">
        <Button type="submit" variant="primary" disabled={loading || !content.trim() || rating === 0} loading={loading}>
          Submit Review
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};