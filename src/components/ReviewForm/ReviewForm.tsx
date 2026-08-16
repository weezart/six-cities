import RatingInputComponent from '../Rating-input/Rating-input';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

type ReviewFormProps = {
  offerId: string;
};

const ReviewFormComponent = ({offerId}: ReviewFormProps) => {
  const dispatch = useAppDispatch();
  const isCommentSending = useAppSelector((state) => state.isCommentSending);
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isTextLengthValid = text.length >= MIN_REVIEW_LENGTH && text.length <= MAX_REVIEW_LENGTH;
  const isSubmitDisabled = isCommentSending || stars === 0 || !isTextLengthValid;

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setErrorMessage(null);
    const result = await dispatch(postCommentAction({
      offerId,
      comment: text,
      rating: stars
    }));

    if (postCommentAction.fulfilled.match(result)) {
      setStars(0);
      setText('');
      return;
    }

    setErrorMessage(result.payload ?? 'Unable to send comment. Please try again.');
  };

  const ratings = [
    {count: 5, title: 'perfect'},
    {count: 4, title: 'good'},
    {count: 3, title: 'not bad'},
    {count: 2, title: 'badly'},
    {count: 1, title: 'terribly'}
  ];

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => {
      void handleFormSubmit(evt);
    }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((rating) => (
          <RatingInputComponent
            key={rating.count}
            count={rating.count}
            title={rating.title}
            isChecked={stars === rating.count}
            isDisabled={isCommentSending}
            setRating={setStars}
          />
        ))}
      </div>
      <textarea
        value={text}
        disabled={isCommentSending}
        minLength={MIN_REVIEW_LENGTH}
        maxLength={MAX_REVIEW_LENGTH}
        onChange={(e) => {
          const newText = e.target.value;
          setText(newText.trimStart());
        }}
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default ReviewFormComponent;
