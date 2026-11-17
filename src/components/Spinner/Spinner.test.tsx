import {render} from '@testing-library/react';
import Spinner from './Spinner';

describe('Component: Spinner', () => {
  it('should render spin animation', () => {
    const {container} = render(<Spinner />);

    expect(container.querySelector('style')?.textContent).toContain('@keyframes spin');
  });
});
