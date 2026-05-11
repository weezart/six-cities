export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  location: Location;
  name: string;
}

type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type MapProps = {
  city: City;
  offers: Offer[];
  selectedOfferId?: number;
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
  setActiveCard: (id: number) => void;
}

export type Review = {
  id: number;
  userName: string;
  avatarUrl: string;
  rating: number;
  text: string;
  dateTime: string;
  dateLabel: string;
}
