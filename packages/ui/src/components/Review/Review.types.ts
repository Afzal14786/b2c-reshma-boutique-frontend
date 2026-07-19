import type { CommentAuthor } from '../Comments/Comments.types';

export interface Review {
  id: string;
  author: CommentAuthor;
  rating: number;
  title?: string;
  content: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  likeCount?: number;
  isLiked?: boolean;
  isHelpful?: boolean;
  isVerifiedPurchase?: boolean;
  attachments?: string[];
  replies?: Review[];
}

export interface ReviewItemProps {
  review: Review;
  onReply?: (reviewId: string, content: string) => void;
  onLike?: (reviewId: string) => void;
  onHelpful?: (reviewId: string) => void;
  onDelete?: (reviewId: string) => void;
  onEdit?: (reviewId: string, content: string) => void;
  depth?: number;
  maxDepth?: number;
  showReplyForm?: boolean;
  onReplyToggle?: (reviewId: string) => void;
}

export interface ReviewFormProps {
  onSubmit: (data: { content: string; rating: number; title?: string }) => void;
  onCancel?: () => void;
  loading?: boolean;
  initialRating?: number;
  initialTitle?: string;
  initialContent?: string;
}

export interface ReviewsProps {
  reviews: Review[];
  onAddReview?: (data: { content: string; rating: number; title?: string }) => void;
  onAddReply?: (reviewId: string, content: string) => void;
  onLike?: (reviewId: string) => void;
  onHelpful?: (reviewId: string) => void;
  onDelete?: (reviewId: string) => void;
  onEdit?: (reviewId: string, content: string) => void;
  loading?: boolean;
  maxDepth?: number;
  emptyText?: string;
  className?: string;
  showAddReview?: boolean;
  averageRating?: number;
  totalReviews?: number;
  ratingDistribution?: Record<number, number>;
}