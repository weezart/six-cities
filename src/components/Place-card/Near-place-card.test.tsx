import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should report hover, mouse leave and bookmark click', async () => {
    const setActiveCard = vi.fn();
    const onBookmarkClick = vi.fn();

    render(withHistory(
      <NearPlaceCardComponent
        id="offer-id"
        isPremium={false}
        imageUrl="img/apartment.jpg"
        price={90}
        isMarkActive={false}
        ratingWidth="80%"
        name="Nearby loft"
        placeType="room"
        setActiveCard={setActiveCard}
        resetCardId="current-id"
        onBookmarkClick={onBookmarkClick}
      />,
    ));

    const card = screen.getByRole('article');

    await userEvent.hover(card);
    await userEvent.unhover(card);
    await userEvent.click(screen.getByRole('button', {name: 'In bookmarks'}));

    expect(setActiveCard).toHaveBeenCalledWith('offer-id');
    expect(setActiveCard).toHaveBeenCalledWith('current-id');
    expect(onBookmarkClick).toHaveBeenCalledWith('offer-id', false);
  });
});
