export interface Subscription {
  chatId: number;
  area: string;
  minMagnitude: number;
}

export interface Earthquake {
  time: string;
  latitude: number;
  longitude: number;
  magnitude: number;
  place: string;
}

export interface UserPreferences {
  radius: number;
  latitude: number;
  longitude: number;
  minMagnitude: number;
}

export enum ViewMode {
  map = "map",
  list = "list",
}

export type MapLocation = {
  lat: number;
  lng: number;
};
