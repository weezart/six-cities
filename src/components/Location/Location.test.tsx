import {render, screen} from '@testing-library/react';
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
});
