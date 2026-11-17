import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';
import FavoritePlaceComponent from './Favorite-place';

describe('Component: FavoritePlace', () => {
  it('should render favorite offer info and premium mark', () => {
    render(withHistory(
      <FavoritePlaceComponent
        id="offer-id"
        isPremium
        imageUrl="img/apartment.jpg"
        price={150}
        isMarkActive
        ratingWidth="80%"
        name="Favorite house"
        placeType="house"
        setActiveCard={() => undefined}
      />,
    ));

    expect(screen.getByText('€150')).toBeInTheDocument();
    expect(screen.getByText('Favorite house')).toBeInTheDocument();
    expect(screen.getByText('house')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
