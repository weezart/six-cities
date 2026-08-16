type RatingInputProps = {
  count: number;
  title: string;
  isChecked: boolean;
  isDisabled: boolean;
  setRating: (rating: number) => void;
}

const RatingInputComponent = ({count, title, isChecked, isDisabled, setRating} : RatingInputProps) => (
  <>
    <input
      className="form__rating-input visually-hidden"
      name="rating"
      value={count}
      id={`${count}-stars`}
      type="radio"
      checked={isChecked}
      disabled={isDisabled}
      onChange={() => setRating(count)}
    />
    <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title={title}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
);

export default RatingInputComponent;
