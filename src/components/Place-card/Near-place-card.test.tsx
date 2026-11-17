import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';
import NearPlaceCardComponent from './Near-place-card';

describe('Component: NearPlaceCard', () => {
  it('should render nearby offer info and premium mark', () => {
    render(withHistory(
      <NearPlaceCardComponent
        id="offer-id"
        isPremium
        imageUrl="img/apartment.jpg"
        price={90}
        isMarkActive={false}
        ratingWidth="80%"
        name="Nearby loft"
        placeType="room"
        setActiveCard={() => undefined}
        resetCardId="current-id"
      />,
    ));

    expect(screen.getByText('€90')).toBeInTheDocument();
    expect(screen.getByText('Nearby loft')).toBeInTheDocument();
    expect(screen.getByText('room')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
