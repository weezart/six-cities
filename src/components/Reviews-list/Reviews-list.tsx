import ReviewsItemComponent from '../Reviews-item/Reviews-item';
import {Review} from '../../types/types';
import { memo } from 'react';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsListComponent({reviews}: ReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewsItemComponent key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

const MemoizedReviewsListComponent = memo(ReviewsListComponent);
export default MemoizedReviewsListComponent;
