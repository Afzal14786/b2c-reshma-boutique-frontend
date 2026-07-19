import React from 'react';
import { Spinner, Rating, Card } from '../../';
import { ReviewItem } from './ReviewItem';
import { ReviewForm } from './ReviewForm';
import { cn } from '../../utils/cn';
import type { ReviewsProps } from './Review.types';

export const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  onAddReview,
  onAddReply,
  onLike,
  onHelpful,
  onDelete,
  onEdit,
  loading = false,
  maxDepth = 3,
  emptyText = 'No reviews yet',
  className,
  showAddReview = true,
  averageRating,
  totalReviews,
  ratingDistribution,
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
      {/* Summary */}
      {(averageRating !== undefined || totalReviews !== undefined) && (
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-6 flex-wrap">
            {averageRating !== undefined && (
              <div className="text-center">
                <span className="text-3xl font-bold text-primary dark:text-primary/90">
                  {averageRating.toFixed(1)}
                </span>
                <Rating value={averageRating} readOnly size="sm" className="mt-1" />
              </div>
            )}
            {totalReviews !== undefined && (
              <p className="text-sm text-text-secondary">
                {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
              </p>
            )}
            {ratingDistribution && totalReviews !== undefined && (
              <div className="flex-1 space-y-1 min-w-[150px]">
                {Object.entries(ratingDistribution)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([stars, count]) => (
                    <div key={stars} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-text-secondary">{stars}★</span>
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-warning rounded-full"
                          style={{
                            width: totalReviews > 0 ? `${(Number(count) / totalReviews) * 100}%` : '0%',
                          }}
                        />
                      </div>
                      <span className="w-8 text-text-secondary text-right">{count}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Add review form */}
      {showAddReview && onAddReview && (
        <ReviewForm onSubmit={onAddReview} />
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-center text-text-secondary/70 py-6 text-sm">{emptyText}</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onReply={onAddReply}
              onLike={onLike}
              onHelpful={onHelpful}
              onDelete={onDelete}
              onEdit={onEdit}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </div>
  );
};