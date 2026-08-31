import cn from 'classnames';
import styles from './Location.module.css';
import { memo, useCallback } from 'react';

type LocationProps = {
  cityName: string;
  activeCityName: string;
  onCityClick: (cityName: string) => void;
}

function LocationComponent({activeCityName, cityName, onCityClick} : LocationProps) {
  const handleClick = useCallback(() => {
    onCityClick(cityName);
  }, [cityName, onCityClick]);

  return (
    <li className="locations__item">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'locations__item-link',
          'tabs__item',
          styles.button,
          activeCityName === cityName && 'tabs__item--active',
        )}
      >
        <span>{cityName}</span>
      </button>
    </li>
  );
}

const MemoizedLocationComponent = memo(LocationComponent);
export default MemoizedLocationComponent;
