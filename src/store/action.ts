import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from '../types/types';

const changeCity = createAction<City>('offers/changeCity');

const fillOffers = createAction<Offer[]>('offers/fillOffers');

export { changeCity, fillOffers };
