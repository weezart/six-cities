type RatingInputProps = {
  count: number;
  title: string;
  setRating: () => void;
}

const RatingInputComponent = ({count, title, setRating} : RatingInputProps) => {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={count} id={`${count}-stars`}
             type="radio"/>
      <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title={title}  onClick={setRating}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingInputComponent;
