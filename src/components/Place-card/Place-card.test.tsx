import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory} from '../../utils/mock-component';
import PlaceCardComponent from './Place-card';

describe('Component: PlaceCard', () => {
  it('should render offer info and premium mark', () => {
    render(withHistory(
      <PlaceCardComponent
        id="offer-id"
        isPremium
        imageUrl="img/apartment.jpg"
        price={120}
        isMarkActive={false}
        ratingWidth="80%"
        name="Nice apartment"
        placeType="apartment"
        setActiveCard={() => undefined}
      />,
    ));

    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('Nice apartment')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render offer info without premium mark', () => {
    render(withHistory(
      <PlaceCardComponent
        id="offer-id"
        isPremium={false}
        imageUrl="img/apartment.jpg"
        price={120}
        isMarkActive={false}
        ratingWidth="80%"
        name="Nice apartment"
        placeType="apartment"
        setActiveCard={() => undefined}
      />,
    ));

    expect(screen.getByText('Nice apartment')).toBeInTheDocument();
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should report card hover and bookmark click', async () => {
    const setActiveCard = vi.fn();
    const onBookmarkClick = vi.fn();

    render(withHistory(
      <PlaceCardComponent
        id="offer-id"
        isPremium={false}
        imageUrl="img/apartment.jpg"
        price={120}
        isMarkActive={false}
        ratingWidth="80%"
        name="Nice apartment"
        placeType="apartment"
        setActiveCard={setActiveCard}
        onBookmarkClick={onBookmarkClick}
      />,
    ));

    await userEvent.hover(screen.getByRole('article'));
    await userEvent.click(screen.getByRole('button', {name: 'To bookmarks'}));

    expect(setActiveCard).toHaveBeenCalledWith('offer-id');
    expect(onBookmarkClick).toHaveBeenCalledWith('offer-id', false);
  });
});
