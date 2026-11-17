import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationComponent from './Location';

describe('Component: Location', () => {
  it('should render active city', () => {
    render(
      <LocationComponent
        cityName="Paris"
        activeCityName="Paris"
        onCityClick={() => undefined}
      />,
    );

    expect(screen.getByRole('button', {name: 'Paris'})).toHaveClass('tabs__item--active');
  });

  it('should render inactive city', () => {
    render(
      <LocationComponent
        cityName="Paris"
        activeCityName="Cologne"
        onCityClick={() => undefined}
      />,
    );

    expect(screen.getByRole('button', {name: 'Paris'})).not.toHaveClass('tabs__item--active');
  });

  it('should call city click handler', async () => {
    const handleCityClick = vi.fn();

    render(
      <LocationComponent
        cityName="Paris"
        activeCityName="Cologne"
        onCityClick={handleCityClick}
      />,
    );

    await userEvent.click(screen.getByRole('button', {name: 'Paris'}));

    expect(handleCityClick).toHaveBeenCalledWith('Paris');
  });
});
