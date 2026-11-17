import type {ReactElement} from 'react';
import {Provider} from 'react-redux';
import type {MemoryHistory} from 'history';
import {createMemoryHistory} from 'history';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import type {Action} from 'redux';
import {createAPI} from '../services/api';
import type {State} from '../types/state';
import HistoryRouter from '../components/History-route/History-route';
import type {AppThunkDispatch} from './mocks';

export function withHistory(component: ReactElement, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      {component}
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: ReactElement,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: (
      <Provider store={mockStore}>
        {component}
      </Provider>
    ),
    mockStore,
    mockAxiosAdapter,
  };
}
