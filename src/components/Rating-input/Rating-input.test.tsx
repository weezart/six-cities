import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should render checked and disabled rating', () => {
    render(
      <RatingInputComponent
        count={5}
        title="perfect"
        isChecked
        isDisabled
        setRating={() => undefined}
      />,
    );

    expect(screen.getByRole('radio')).toBeChecked();
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('should call rating handler', async () => {
    const setRating = vi.fn();

    render(
      <RatingInputComponent
        count={5}
        title="perfect"
        isChecked={false}
        isDisabled={false}
        setRating={setRating}
      />,
    );

    await userEvent.click(screen.getByRole('radio'));

    expect(setRating).toHaveBeenCalledWith(5);
  });
});
