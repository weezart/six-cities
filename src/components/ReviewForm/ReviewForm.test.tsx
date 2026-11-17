import {render, screen} from '@testing-library/react';
import {makeFakeStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import ReviewFormComponent from './ReviewForm';

describe('Component: ReviewForm', () => {
  it('should render review form', () => {
    const {withStoreComponent} = withStore(
      <ReviewFormComponent offerId="offer-id" />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
  });
});
