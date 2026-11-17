import {render, screen} from '@testing-library/react';
import {makeFakeReview} from '../../utils/mocks';
import ReviewsListComponent from './Reviews-list';

describe('Component: ReviewsList', () => {
  it('should render reviews count and review text', () => {
    const review = makeFakeReview();

    render(<ReviewsListComponent reviews={[review]} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(review.text)).toBeInTheDocument();
    expect(screen.getByText(review.userName)).toBeInTheDocument();
  });
});
