'use client'
import React, { useState } from 'react';
import { Avatar, Card, Rating, Button } from '../../';
import { cn } from '../../utils/cn';
import { CommentForm } from './CommentForm';
import type { CommentItemProps } from './Comments.types';

// ─── Icons ──────────────────────────────────────────────────────

const LikeIcon = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-secondary' : 'text-text-secondary/50'}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const ReplyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 13 21 17 17 21" />
    <path d="M3 11a6 6 0 0 1 6-6h9" />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onLike,
  onHelpful,
  onDelete,
  onEdit,
  depth = 0,
  maxDepth = 3,
  variant = 'default',
  showReplyForm = false,
  onReplyToggle,
}) => {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(showReplyForm);
  const [showReplies, setShowReplies] = useState(true);
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    onLike?.(comment.id);
  };

  const handleReplySubmit = (content: string) => {
    onReply?.(comment.id, content);
    setIsReplyFormOpen(false);
    onReplyToggle?.(comment.id);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;
  const replyCount = comment.replies?.length || 0;
  const isAdmin = comment.senderRole === 'ADMIN';

  return (
    <Card variant="glass" className={cn('p-4', depth > 0 && 'ml-6 mt-3')}>
      <div className="flex items-start gap-3">
        <Avatar
          src={comment.author.avatar}
          name={comment.author.name}
          size="sm"
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-text-primary dark:text-text-primary/90">
              {comment.author.name}
            </span>
            {isAdmin && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary">
                Admin
              </span>
            )}
            <span className="text-xs text-text-secondary/60">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>

          {comment.rating && (
            <div className="mt-1">
              <Rating value={comment.rating} readOnly size="sm" />
            </div>
          )}

          <p className="mt-1 text-sm text-text-primary dark:text-text-primary/90 whitespace-pre-wrap break-words">
            {comment.content}
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
                  onReplyToggle?.(comment.id);
                }}
                className="flex items-center gap-1 text-xs text-text-secondary/70 hover:text-text-primary transition-colors"
              >
                <ReplyIcon />
                <span>Reply</span>
              </button>
            )}

            {onHelpful && (
              <button
                onClick={() => onHelpful(comment.id)}
                className="text-xs text-text-secondary/70 hover:text-text-primary transition-colors"
              >
                Helpful
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(comment.id)}
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
              {comment.replies?.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  onHelpful={onHelpful}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                  variant={variant}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};