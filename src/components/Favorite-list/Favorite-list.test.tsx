import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {makeFakeOffer} from '../../utils/mocks';
import {withHistory} from '../../utils/mock-component';
import FavoriteListComponent from './Favorite-list';

describe('Component: FavoriteList', () => {
  it('should render city and favorite offer', () => {
    const offer = {...makeFakeOffer(), title: 'Favorite house'};

    render(withHistory(
      <FavoriteListComponent
        city="Paris"
        offers={[offer]}
        onBookmarkClick={() => undefined}
      />,
    ));

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Favorite house')).toBeInTheDocument();
  });

  it('should report bookmark click', async () => {
    const offer = makeFakeOffer();
    const onBookmarkClick = vi.fn();

    render(withHistory(
      <FavoriteListComponent
        city="Paris"
        offers={[offer]}
        onBookmarkClick={onBookmarkClick}
      />,
    ));

    await userEvent.click(screen.getByRole('button', {name: 'In bookmarks'}));

    expect(onBookmarkClick).toHaveBeenCalledWith(offer.id, true);
  });
});
