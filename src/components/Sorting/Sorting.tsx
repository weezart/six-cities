import classNames from 'classnames';
import { useState } from 'react';
import { SortOption, SortList } from '../../const';

type SortingProps = {
  activeSortOption: SortOption;
  onSortOptionChange: (sortOption: SortOption) => void;
};

function SortingComponent({
  activeSortOption,
  onSortOptionChange
}: SortingProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleSortOptionClick = (sortOption: SortOption) => {
    onSortOptionChange(sortOption);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((opened) => !opened)}
      >
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames(
          'places__options',
          'places__options--custom',
          {'places__options--opened': isOpened}
        )}
      >
        {SortList.map((sortListItem) => (
          <li
            className={classNames(
              'places__option',
              {'places__option--active': sortListItem === activeSortOption}
            )}
            tabIndex={0}
            key={sortListItem}
            onClick={() => handleSortOptionClick(sortListItem)}
          >
            {sortListItem}
          </li>
        ))}
      </ul>
    </form>
  );
}
export default SortingComponent;
