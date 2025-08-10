import {FavoriteList} from "../types/types";

export const FAVORITES:FavoriteList[] = [
  {
    id: 'favorite city №1',
    city: 'Amsterdam',
    places: [
      {
        id: 'Amsterdam place №1',
        isPremium: true,
        imageUrl: 'img/apartment-small-03.jpg',
        price: 180,
        ratingWidth: '100%',
        name: 'Nice, cozy, warm big bed apartment',
        placeType: 'Apartment',
      },
      {
        id: 'Amsterdam place №2',
        isPremium: false,
        imageUrl: 'img/room-small.jpg',
        price: 80,
        ratingWidth: '100%',
        name: 'Wood and stone place',
        placeType: 'Room',
      }
    ],
  },
  {
    id: 'favorite city №2',
    city: 'Cologne',
    places: [
      {
        id: 'Cologne place №1',
        isPremium: false,
        imageUrl: 'img/apartment-small-04.jpg',
        price: 180,
        ratingWidth: '100%',
        name: 'White castle',
        placeType: 'Apartment',
      },
    ]
  }
];

export const FAVORITES_EMPTY = [];
