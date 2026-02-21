import RatingInputComponent from "../Rating-input/Rating-input";
import { useState } from 'react';

const ReviewFormComponent = () => {
  const [ReviewState, setReviewState] = useState({ stars: 0, text: '' });
  function setStars(newStars: number) {
    setReviewState({
      ...ReviewState,
      stars: newStars
    });
  }
  function setText(newText: string) {
    setReviewState({
      ...ReviewState,
      text: newText
    });
  }
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingInputComponent count={5} title={'perfect'} setRating={() => setStars(5)} />
        <RatingInputComponent count={4} title={'good'} setRating={() => setStars(4)} />
        <RatingInputComponent count={3} title={'not bad'} setRating={() => setStars(3)} />
        <RatingInputComponent count={2} title={'badly'} setRating={() => setStars(2)} />
        <RatingInputComponent count={1} title={'terribly'} setRating={() => setStars(1)} />
      </div>
      <textarea  onChange={(e) => {
        console.log("Text");
        const newText = e.target.value
        console.log(newText);
        newText ? setText(newText) : null;
      }}  className="reviews__textarea form__textarea" id="review" name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"
      >
                    </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
      Ваша оценка: {ReviewState.stars} Ваш отзыв: {ReviewState.text}
    </form>
  );
}

export default ReviewFormComponent;
