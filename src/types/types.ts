type Location = {
  latitude: number,
  longitude: number,
  zoom: number
}

type City =  {
  location: Location,
  name: string
}

type Host =  {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string
}

export type Offer =  {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  max_adults: number,
  preview_image: string,
  price: number,
  rating: number,
  title: string,
  type: string,
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
