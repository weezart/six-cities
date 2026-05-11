import ReviewsItemComponent from '../Reviews-item/Reviews-item';
import {Review} from '../../types/types';

type ReviewsListProps = {
  reviews: Review[];
}

const ReviewsListComponent = ({reviews}: ReviewsListProps) => (
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

export default ReviewsListComponent;
