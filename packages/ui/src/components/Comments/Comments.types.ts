export interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string | null;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  rating?: number;
  replies?: Comment[];
  likeCount?: number;
  isLiked?: boolean;
  isHelpful?: boolean;
  attachments?: string[];
  senderRole?: 'USER' | 'ADMIN';
}

export interface CommentItemProps {
  comment: Comment;
  onReply?: (parentId: string, content: string) => void;
  onLike?: (commentId: string) => void;
  onHelpful?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  depth?: number;
  maxDepth?: number;
  variant?: 'review' | 'ticket' | 'default';
  showReplyForm?: boolean;
  onReplyToggle?: (commentId: string) => void;
}

export interface CommentFormProps {
  onSubmit: (content: string, rating?: number) => void;
  onCancel?: () => void;
  placeholder?: string;
  loading?: boolean;
  autoFocus?: boolean;
  initialValue?: string;
  showRating?: boolean;
  ratingValue?: number;
  onRatingChange?: (value: number) => void;
  className?: string;
}

export interface CommentsProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
  onAddReply?: (parentId: string, content: string) => void;
  onLike?: (commentId: string) => void;
  onHelpful?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  loading?: boolean;
  variant?: 'review' | 'ticket' | 'default';
  showRatingInForm?: boolean;
  maxDepth?: number;
  emptyText?: string;
  className?: string;
  showAddComment?: boolean;
}