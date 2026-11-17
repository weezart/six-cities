import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {APIRoute} from '../../const';
import {postCommentAction} from '../../store/api-actions';
import {extractActionsTypes, makeFakeStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import ReviewFormComponent from './ReviewForm';

const reviewText = 'A'.repeat(50);
const placeholder = 'Tell how was your stay, what you like and what can be improved';

describe('Component: ReviewForm', () => {
  it('should render review form', () => {
    const {withStoreComponent} = withStore(
      <ReviewFormComponent offerId="offer-id" />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
  });

  it('should keep submit disabled until rating and review text are valid', async () => {
    const {withStoreComponent} = withStore(
      <ReviewFormComponent offerId="offer-id" />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const submitButton = screen.getByRole('button', {name: 'Submit'});

    expect(submitButton).toBeDisabled();

    await userEvent.click(screen.getByTitle('perfect'));

    expect(submitButton).toBeDisabled();

    await userEvent.type(screen.getByPlaceholderText(placeholder), 'Too short');

    expect(submitButton).toBeDisabled();
  });

  it('should dispatch post comment action', async () => {
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(
      <ReviewFormComponent offerId="offer-id" />,
      makeFakeStore(),
    );
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/offer-id`).reply(200, []);

    render(withStoreComponent);

    await userEvent.click(screen.getByTitle('perfect'));
    await userEvent.type(screen.getByPlaceholderText(placeholder), reviewText);
    await userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(placeholder)).toHaveValue('');
    });
    expect(extractActionsTypes(mockStore.getActions())).toContain(postCommentAction.pending.type);
  });

  it('should show an error when the comment is rejected', async () => {
    const {withStoreComponent, mockAxiosAdapter} = withStore(
      <ReviewFormComponent offerId="offer-id" />,
      makeFakeStore(),
    );
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/offer-id`).reply(400);

    render(withStoreComponent);

    await userEvent.click(screen.getByTitle('perfect'));
    await userEvent.type(screen.getByPlaceholderText(placeholder), reviewText);
    await userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    expect(await screen.findByText('Unable to send comment. Please try again.')).toBeInTheDocument();
  });
});
