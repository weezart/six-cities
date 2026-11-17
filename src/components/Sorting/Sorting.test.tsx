import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SortOption} from '../../const';
import SortingComponent from './Sorting';

describe('Component: Sorting', () => {
  it('should render active option and the rest of the sort list', () => {
    render(
      <SortingComponent
        activeSortOption={SortOption.Popular}
        onSortOptionChange={() => undefined}
      />,
    );

    expect(screen.getAllByText(SortOption.Popular).length).toBeGreaterThan(0);
    expect(screen.getByText(SortOption.PriceLowToHigh)).toBeInTheDocument();
    expect(screen.getByText(SortOption.PriceHighToLow)).toBeInTheDocument();
    expect(screen.getByText(SortOption.TopRatedFirst)).toBeInTheDocument();
  });

  it('should open options and report the selected sort', async () => {
    const handleSortOptionChange = vi.fn();

    render(
      <SortingComponent
        activeSortOption={SortOption.Popular}
        onSortOptionChange={handleSortOptionChange}
      />,
    );

    const options = screen.getByRole('list');

    expect(options).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByText(SortOption.Popular, {selector: '.places__sorting-type'}));

    expect(options).toHaveClass('places__options--opened');

    await userEvent.click(screen.getByText(SortOption.PriceLowToHigh));

    expect(handleSortOptionChange).toHaveBeenCalledWith(SortOption.PriceLowToHigh);
    expect(options).not.toHaveClass('places__options--opened');
  });
});
