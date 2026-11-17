import {render, screen} from '@testing-library/react';
import MainEmpty from './Main-empty';

describe('Component: MainEmpty', () => {
  it('should render empty city message', () => {
    render(<MainEmpty cityName="Paris" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/Paris/)).toBeInTheDocument();
  });
});
