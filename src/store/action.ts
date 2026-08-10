import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from '../types/types';
import {AuthorizationStatus} from '../const';

const changeCity = createAction<City>('offers/changeCity');

const loadOffers = createAction<Offer[]>('offers/load-all');

const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthStatus');

export { changeCity, loadOffers, setAuthorizationStatus };
