import {render, screen} from '@testing-library/react';
import Loading from './Loading';

describe('Component: Loading', () => {
  it('should render logo', () => {
    render(<Loading />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
