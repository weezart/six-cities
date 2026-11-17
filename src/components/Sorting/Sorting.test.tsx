import {render, screen} from '@testing-library/react';
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
});
