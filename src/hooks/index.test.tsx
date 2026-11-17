import type {PropsWithChildren} from 'react';
import {renderHook} from '@testing-library/react';
import {Provider} from 'react-redux';
import {changeCity} from '../store/offers-slice/offers-slice';
import {selectCityName} from '../store/selectors';
import {makeFakeStore} from '../utils/mocks';
import {withStore} from '../utils/mock-component';
import {useAppDispatch, useAppSelector} from './index';

const cityName = 'Cologne';

const createStoreWrapper = () => {
  const {mockStore} = withStore(
    <span />,
    makeFakeStore({
      offers: {
        cityName,
        offers: [],
        isOffersLoading: false,
      },
    }),
  );
  const wrapper = ({children}: PropsWithChildren) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  return {mockStore, wrapper};
};

describe('Hook: useAppDispatch', () => {
  it('should dispatch an action', () => {
    const {mockStore, wrapper} = createStoreWrapper();
    const {result} = renderHook(() => useAppDispatch(), {wrapper});

    result.current(changeCity(cityName));

    expect(result.current).toEqual(expect.any(Function));
    expect(mockStore.getActions()).toContainEqual(changeCity(cityName));
  });
});

describe('Hook: useAppSelector', () => {
  it('should return selected state', () => {
    const {wrapper} = createStoreWrapper();
    const {result} = renderHook(() => useAppSelector(selectCityName), {wrapper});

    expect(result.current).toBe(cityName);
  });
});
