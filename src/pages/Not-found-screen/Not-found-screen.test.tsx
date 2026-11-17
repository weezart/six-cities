import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';
import NotFoundScreen from './Not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render not found message and link to main page', () => {
    render(withHistory(<NotFoundScreen />));

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
