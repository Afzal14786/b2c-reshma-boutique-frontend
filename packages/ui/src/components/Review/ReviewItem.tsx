'use client'
import React, { useState } from 'react';
import { Avatar, Card, Rating, Button } from '../../';
import { cn } from '../../utils/cn';
import { CommentForm } from '../Comments/CommentForm';
import type { ReviewItemProps } from './Review.types';

// ─── Icons ──────────────────────────────────────────────────────

const LikeIcon = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-secondary' : 'text-text-secondary/50'}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onReply,
  onLike,
  onHelpful,
  onDelete,
  onEdit,
  depth = 0,
  maxDepth = 3,
  showReplyForm = false,
  onReplyToggle,
}) => {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(showReplyForm);
  const [showReplies, setShowReplies] = useState(true);
  const [isLiked, setIsLiked] = useState(review.isLiked || false);
  const [likeCount, setLikeCount] = useState(review.likeCount || 0);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    onLike?.(review.id);
  };

  const handleReplySubmit = (content: string) => {
    onReply?.(review.id, content);
    setIsReplyFormOpen(false);
    onReplyToggle?.(review.id);
  };

  const hasReplies = review.replies && review.replies.length > 0;
  const replyCount = review.replies?.length || 0;
  const isVerified = review.isVerifiedPurchase;

  return (
    <Card variant="glass" className={cn('p-4', depth > 0 && 'ml-6 mt-3')}>
      <div className="flex items-start gap-3">
        <Avatar
          src={review.author.avatar}
          name={review.author.name}
          size="sm"
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-text-primary dark:text-text-primary/90">
              {review.author.name}
            </span>
            {isVerified && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-success/10 text-success">
                Verified
              </span>
            )}
            <span className="text-xs text-text-secondary/60">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Rating */}
          <div className="mt-1">
            <Rating value={review.rating} readOnly size="sm" />
          </div>

          {/* Title */}
          {review.title && (
            <h4 className="mt-1 text-sm font-semibold text-primary dark:text-primary/90">
              {review.title}
            </h4>
          )}

          {/* Content */}
          <p className="mt-1 text-sm text-text-primary dark:text-text-primary/90 whitespace-pre-wrap break-words">
            {review.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-xs text-text-secondary/70 hover:text-text-primary transition-colors"
            >
              <LikeIcon active={isLiked} />
              <span>{likeCount}</span>
            </button>

            {depth < maxDepth && onReply && (
              <button
                onClick={() => {
                  setIsReplyFormOpen(!isReplyFormOpen);
                  onReplyToggle?.(review.id);
                }}
                className="text-xs text-text-secondary/70 hover:text-text-primary transition-colors"
              >
                Reply
              </button>
            )}

            {onHelpful && (
              <button
                onClick={() => onHelpful(review.id)}
                className="text-xs text-text-secondary/70 hover:text-text-primary transition-colors"
              >
                Helpful
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(review.id)}
                className="text-xs text-error/70 hover:text-error transition-colors"
              >
                Delete
              </button>
            )}
          </div>

          {/* Reply form */}
          {isReplyFormOpen && (
            <div className="mt-3">
              <CommentForm
                onSubmit={handleReplySubmit}
                onCancel={() => setIsReplyFormOpen(false)}
                placeholder="Write a reply…"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {hasReplies && (
        <div className="mt-3">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-xs text-text-secondary/70 hover:text-text-primary transition-colors"
          >
            <ChevronDownIcon open={showReplies} />
            <span>{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
          </button>
          {showReplies && (
            <div className="mt-2 space-y-1">
              {review.replies?.map((reply) => (
                <ReviewItem
                  key={reply.id}
                  review={reply}
                  onReply={onReply}
                  onLike={onLike}
                  onHelpful={onHelpful}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};