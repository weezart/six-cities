import { memo, useCallback } from 'react';

type RatingInputProps = {
  count: number;
  title: string;
  isChecked: boolean;
  isDisabled: boolean;
  setRating: (rating: number) => void;
}

function RatingInputComponent({count, title, isChecked, isDisabled, setRating} : RatingInputProps) {
  const handleChange = useCallback(() => {
    setRating(count);
  }, [count, setRating]);

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={count}
        id={`${count}-stars`}
        type="radio"
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

const MemoizedRatingInputComponent = memo(RatingInputComponent);
export default MemoizedRatingInputComponent;
