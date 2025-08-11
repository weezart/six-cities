export type Offer = {
  id: string;
  isPremium: boolean;
  imageUrl: string;
  imageSmallUrl: string;
  price: number;
  isFavorite: boolean;
  ratingWidth: string;
  name: string;
  placeType: string;
  city: string;
}

export type Favorite = {
  id: string;
  isPremium: boolean;
  imageUrl: string;
  price: number;
  ratingWidth: string;
  name: string;
  placeType: string;
}

export type FavoriteList = {
  id: string;
  city: string;
  places: Favorite[];
}
