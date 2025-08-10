export type Location = {
  id: string;
  city: string;
  isActive: boolean;
}

export type Offer = {
  id: string;
  isPremium: boolean;
  imageUrl: string;
  price: number;
  isMarkActive: boolean;
  ratingWidth: string;
  name: string;
  placeType: string;
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
