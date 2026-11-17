import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';
import LogoComponent from './Logo';

describe('Component: Logo', () => {
  it('should render logo link', () => {
    render(withHistory(<LogoComponent isActive />));

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
