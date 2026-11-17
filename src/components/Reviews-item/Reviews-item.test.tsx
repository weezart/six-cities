import {render, screen} from '@testing-library/react';
import {makeFakeReview} from '../../utils/mocks';
import ReviewsItemComponent from './Reviews-item';

describe('Component: ReviewsItem', () => {
  it('should render review content', () => {
    const review = makeFakeReview();

    render(<ReviewsItemComponent review={review} />);

    expect(screen.getByText(review.userName)).toBeInTheDocument();
    expect(screen.getByText(review.text)).toBeInTheDocument();
    expect(screen.getByText(review.dateLabel)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
  });
});
