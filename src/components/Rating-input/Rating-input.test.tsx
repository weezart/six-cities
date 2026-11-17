import {render, screen} from '@testing-library/react';
import RatingInputComponent from './Rating-input';

describe('Component: RatingInput', () => {
  it('should render rating label', () => {
    render(
      <RatingInputComponent
        count={5}
        title="perfect"
        isChecked={false}
        isDisabled={false}
        setRating={() => undefined}
      />,
    );

    expect(screen.getByTitle('perfect')).toBeInTheDocument();
  });
});
