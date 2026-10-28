export type NavTab = 'directions' | 'explore' | 'traffic' | 'saved';

export type TransportMode = 'car' | 'transit' | 'bike' | 'walking';

export type MapLayerType = 'dark' | 'streets' | 'satellite' | 'terrain';

export type TrafficStatus = 'clear' | 'moderate' | 'slow' | 'heavy';

export interface TrafficSegment {
  id: string;
  name: string;
  status: TrafficStatus;
  speedKmH: number;
  coordinates: [number, number][]; // [longitude, latitude]
}

export interface RouteOption {
  id: string;
  name: string;
  via: string;
  badge?: string;
  distanceKm: number;
  durationMinutes: number;
  durationText: string;
  tollCost: number;
  eta: string;
  delayMinutes: number;
  isFastest: boolean;
  coordinates: [number, number][]; // LineString coords [lng, lat]
  trafficSegments: TrafficSegment[];
  summary: string;
  description: string;
  steps: {
    instruction: string;
    distance: string;
    duration: string;
    icon: 'straight' | 'turn-left' | 'turn-right' | 'merge' | 'toll' | 'finish';
  }[];
}

export interface PlaceMarkerData {
  id: string;
  name: string;
  category: 'landmark' | 'fuel' | 'food' | 'rest_stop' | 'ev_charging';
  coordinates: [number, number];
  address: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  openNow: boolean;
  distanceFromRouteKm?: number;
  description?: string;
}

export interface AlertMarkerData {
  id: string;
  type: 'construction' | 'congestion' | 'camera' | 'toll' | 'hazard';
  title: string;
  location: string;
  coordinates: [number, number];
  delayMinutes: number;
  severity: 'low' | 'moderate' | 'high';
  description: string;
  updatedTime: string;
  reportedByCount: number;
}

export interface Waypoint {
  id: string;
  name: string;
  fullName: string;
  coordinates: [number, number];
  type: 'origin' | 'destination' | 'via';
}
