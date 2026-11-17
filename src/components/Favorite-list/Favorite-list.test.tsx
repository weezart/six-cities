import {render, screen} from '@testing-library/react';
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
});
