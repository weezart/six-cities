import {createAction} from '@reduxjs/toolkit';
import {City, Offer, UserData} from '../types/types';
import {AuthorizationStatus} from '../const';

const changeCity = createAction<City>('offers/changeCity');

const loadOffers = createAction<Offer[]>('offers/load-all');

const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthStatus');
const setUser = createAction<UserData | null>('user/setUser');

const setIsLoading = createAction<boolean>('offers/setLoading');

export { changeCity, loadOffers, setAuthorizationStatus, setUser, setIsLoading };
