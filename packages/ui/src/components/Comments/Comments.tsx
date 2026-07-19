import React from 'react';
import { Spinner } from '../Spinner';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { cn } from '../../utils/cn';
import type { CommentsProps } from './Comments.types';

export const Comments: React.FC<CommentsProps> = ({
  comments,
  onAddComment,
  onAddReply,
  onLike,
  onHelpful,
  onDelete,
  onEdit,
  loading = false,
  variant = 'default',
  showRatingInForm = false,
  maxDepth = 3,
  emptyText = 'No comments yet',
  className,
  showAddComment = true,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner variant="glass" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Add comment form */}
      {showAddComment && onAddComment && (
        <CommentForm
          onSubmit={(content, rating) => onAddComment(content)}
          showRating={showRatingInForm}
          placeholder={variant === 'review' ? 'Write a review…' : 'Add a comment…'}
        />
      )}

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className="text-center text-text-secondary/70 py-6 text-sm">{emptyText}</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={onAddReply}
              onLike={onLike}
              onHelpful={onHelpful}
              onDelete={onDelete}
              onEdit={onEdit}
              maxDepth={maxDepth}
              variant={variant}
            />
          ))}
        </div>
      )}
    </div>
  );
};