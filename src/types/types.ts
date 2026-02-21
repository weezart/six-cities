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
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type PlaceCardProps = {
  id: number;
  isPremium: boolean;
  imageUrl: string;
  price: number;
  isMarkActive: boolean;
  ratingWidth: string;
  name: string;
  placeType: string;
  setActiveCard: (id: number) => void
}
