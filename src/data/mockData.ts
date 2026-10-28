import type { RouteOption, PlaceMarkerData, AlertMarkerData, Waypoint } from '../types';

export const DEFAULT_ORIGIN: Waypoint = {
  id: 'origin-1',
  name: 'Gurugram',
  fullName: 'Gurugram (Cyber City / NH 48), Haryana',
  coordinates: [77.0300, 28.4710],
  type: 'origin',
};

export const DEFAULT_DESTINATION: Waypoint = {
  id: 'dest-1',
  name: 'Jaipur',
  fullName: 'Jaipur (Hawa Mahal / MI Road), Rajasthan',
  coordinates: [75.8267, 26.9239],
  type: 'destination',
};

// Detailed coordinate sequence following NH 48 corridor
export const NH48_COORDINATES: [number, number][] = [
  [77.0300, 28.4710], // Gurugram Cyber Hub
  [77.0274, 28.4554], // Rajiv Chowk Gurugram
  [77.0080, 28.4230], // Hero Honda Chowk
  [76.9930, 28.4045], // Kherki Daula
  [76.9720, 28.3840], // Manesar Industrial Gateway
  [76.9380, 28.3588], // IMT Manesar
  [76.9120, 28.3340], // Panchgaon
  [76.8820, 28.3050], // Bilaspur Chowk
  [76.8430, 28.2690], // Sidhrawali
  [76.8120, 28.2410], // Kapriwas
  [76.7900, 28.2100], // Dharuhera Flyover
  [76.7320, 28.1690], // Masani Barrage
  [76.6640, 28.1280], // Rewari Exit
  [76.5880, 28.0820], // Bawal Industrial Area
  [76.4950, 28.0410], // Kundal
  [76.3850, 27.9940], // Shahjahanpur Toll / Rajasthan Border
  [76.3880, 27.9890], // Neemrana Japanese Zone
  [76.3350, 27.9420], // Gandala
  [76.2800, 27.8900], // Behror Midpoint
  [76.2420, 27.8010], // Gunti
  [76.2000, 27.7050], // Kotputli Bypass
  [76.1510, 27.6320], // Paniyala
  [76.0800, 27.5600], // Paota Highway Junction
  [76.0210, 27.4730], // Pragpura
  [75.9600, 27.3850], // Shahpura Market Bypass
  [75.9400, 27.2800], // Manoharpur Toll Plaza
  [75.9300, 27.2000], // Chandwaji
  [75.9200, 27.1400], // Achrol
  [75.8920, 27.0650], // Kukas Tech Hub
  [75.8507, 26.9855], // Amer Fort Ridge
  [75.8460, 26.9535], // Jal Mahal Outer
  [75.8360, 26.9380], // Zorawar Singh Gate
  [75.8267, 26.9239], // Jaipur City Center (Hawa Mahal / MI Road)
];

// Alternate: NE4 Delhi-Mumbai Expressway Corridor
export const NE4_COORDINATES: [number, number][] = [
  [77.0300, 28.4710],
  [77.0600, 28.3800],
  [77.1200, 28.2500],
  [77.0800, 28.0200], // Sohna NE4 Interchange
  [77.0100, 27.8200],
  [76.8900, 27.5500],
  [76.7500, 27.2200],
  [76.6200, 26.9800], // Dausa Interchange
  [76.3400, 26.9100], // NH21 to Jaipur
  [76.0500, 26.8900],
  [75.8267, 26.9239],
];

// Alternate 3: Alwar Scenic State Highway Corridor
export const ALWAR_COORDINATES: [number, number][] = [
  [77.0300, 28.4710],
  [77.0100, 28.2500],
  [76.9200, 28.0100],
  [76.6200, 27.5600], // Alwar City
  [76.4800, 27.3500],
  [76.2200, 27.1500],
  [75.9200, 27.0200],
  [75.8267, 26.9239],
];

export const MOCK_ROUTES: RouteOption[] = [
  {
    id: 'route-nh48',
    name: 'NH 48 (Delhi - Jaipur Expressway)',
    via: 'via NH 48 & Behror',
    badge: 'Fastest route',
    distanceKm: 242.4,
    durationMinutes: 252, // 4 hr 12 min
    durationText: '4 hr 12 min',
    tollCost: 395,
    eta: '6:42 PM',
    delayMinutes: 18,
    isFastest: true,
    coordinates: NH48_COORDINATES,
    summary: 'Direct dual-carriageway highway. Expect 18 min delay near Dharuhera flyover expansion.',
    description: 'Continuous 6-lane access-controlled highway. Well-serviced with rest areas and EV charging at Neemrana.',
    trafficSegments: [
      {
        id: 'seg-1',
        name: 'Gurugram Rajiv Chowk to Kherki Daula',
        status: 'moderate',
        speedKmH: 48,
        coordinates: NH48_COORDINATES.slice(0, 5),
      },
      {
        id: 'seg-2',
        name: 'Manesar to Dharuhera (Bridge Work)',
        status: 'slow',
        speedKmH: 26,
        coordinates: NH48_COORDINATES.slice(4, 11),
      },
      {
        id: 'seg-3',
        name: 'Dharuhera to Neemrana',
        status: 'clear',
        speedKmH: 88,
        coordinates: NH48_COORDINATES.slice(10, 18),
      },
      {
        id: 'seg-4',
        name: 'Neemrana to Kotputli Bypass',
        status: 'moderate',
        speedKmH: 58,
        coordinates: NH48_COORDINATES.slice(17, 22),
      },
      {
        id: 'seg-5',
        name: 'Kotputli to Manoharpur Toll',
        status: 'clear',
        speedKmH: 84,
        coordinates: NH48_COORDINATES.slice(21, 26),
      },
      {
        id: 'seg-6',
        name: 'Manoharpur to Amer / Jaipur Entry',
        status: 'clear',
        speedKmH: 74,
        coordinates: NH48_COORDINATES.slice(25, 33),
      },
    ],
    steps: [
      { instruction: 'Head south on NH 48 toward Rajiv Chowk', distance: '4.2 km', duration: '6 min', icon: 'straight' },
      { instruction: 'Pass through Kherki Daula Fastag Toll Plaza (Lane 4-7 open)', distance: '12.8 km', duration: '14 min', icon: 'toll' },
      { instruction: 'Merge onto elevated corridor past IMT Manesar', distance: '18.5 km', duration: '19 min', icon: 'merge' },
      { instruction: 'Caution: Reduced lanes near Dharuhera flyover construction', distance: '24.1 km', duration: '32 min', icon: 'straight' },
      { instruction: 'Continue on NH 48 straight past Shahjahanpur / Neemrana border', distance: '54.0 km', duration: '38 min', icon: 'straight' },
      { instruction: 'Take the bypass around Kotputli', distance: '36.2 km', duration: '28 min', icon: 'turn-right' },
      { instruction: 'Manoharpur Toll Plaza (Lane 2 dedicated RFID)', distance: '48.0 km', duration: '36 min', icon: 'toll' },
      { instruction: 'Pass Kukas and enter Amer bypass road', distance: '28.4 km', duration: '24 min', icon: 'straight' },
      { instruction: 'Arrive at MI Road / Hawa Mahal, Jaipur', distance: '16.2 km', duration: '15 min', icon: 'finish' },
    ],
  },
  {
    id: 'route-ne4',
    name: 'NE 4 Expressway via Dausa',
    via: 'via Delhi-Mumbai Expy & NH 21',
    badge: 'Smoothest drive',
    distanceKm: 278.1,
    durationMinutes: 235, // 3 hr 55 min
    durationText: '3 hr 55 min',
    tollCost: 620,
    eta: '6:25 PM',
    delayMinutes: 3,
    isFastest: false,
    coordinates: NE4_COORDINATES,
    summary: '120 km/h speed limit expressway. 36 km longer, but saves 17 minutes with zero urban congestion.',
    description: 'Modern 8-lane grade-separated greenfield expressway with automated electronic tolling.',
    trafficSegments: [
      {
        id: 'seg-ne4-1',
        name: 'Sohna Interchange',
        status: 'clear',
        speedKmH: 95,
        coordinates: NE4_COORDINATES.slice(0, 4),
      },
      {
        id: 'seg-ne4-2',
        name: 'NE 4 High-speed Corridor',
        status: 'clear',
        speedKmH: 115,
        coordinates: NE4_COORDINATES.slice(3, 8),
      },
      {
        id: 'seg-ne4-3',
        name: 'NH 21 Dausa to Jaipur link',
        status: 'moderate',
        speedKmH: 62,
        coordinates: NE4_COORDINATES.slice(7, 11),
      },
    ],
    steps: [
      { instruction: 'Head south on Sohna Elevated Road toward NE 4 Interchange', distance: '22 km', duration: '18 min', icon: 'straight' },
      { instruction: 'Merge onto Delhi-Mumbai Expressway (NE 4)', distance: '165 km', duration: '85 min', icon: 'merge' },
      { instruction: 'Take Exit 72 toward Dausa / NH 21', distance: '2.5 km', duration: '3 min', icon: 'turn-right' },
      { instruction: 'Follow NH 21 Westbound directly into Jaipur East Bypass', distance: '55 km', duration: '45 min', icon: 'straight' },
      { instruction: 'Arrive at Jaipur Center', distance: '33.6 km', duration: '28 min', icon: 'finish' },
    ],
  },
  {
    id: 'route-alwar',
    name: 'State Highway 25 via Alwar',
    via: 'via Bhiwadi, Alwar & Rajgarh',
    badge: 'Toll-free / Scenic',
    distanceKm: 258.0,
    durationMinutes: 320, // 5 hr 20 min
    durationText: '5 hr 20 min',
    tollCost: 0,
    eta: '7:50 PM',
    delayMinutes: 32,
    isFastest: false,
    coordinates: ALWAR_COORDINATES,
    summary: 'Scenic countryside route through Aravalli hills and Alwar. Slower with local intersections.',
    description: 'State highway with two-lane segments and frequent village speed breakers.',
    trafficSegments: [
      {
        id: 'seg-alw-1',
        name: 'Bhiwadi to Alwar',
        status: 'moderate',
        speedKmH: 52,
        coordinates: ALWAR_COORDINATES.slice(0, 4),
      },
      {
        id: 'seg-alw-2',
        name: 'Alwar to Sariska corridor',
        status: 'clear',
        speedKmH: 65,
        coordinates: ALWAR_COORDINATES.slice(3, 6),
      },
      {
        id: 'seg-alw-3',
        name: 'Jaipur Ring connection',
        status: 'slow',
        speedKmH: 35,
        coordinates: ALWAR_COORDINATES.slice(5, 8),
      },
    ],
    steps: [
      { instruction: 'Follow Southern Peripheral Road to Bhiwadi Highway', distance: '38 km', duration: '40 min', icon: 'turn-left' },
      { instruction: 'Pass through Alwar bypass road', distance: '62 km', duration: '68 min', icon: 'straight' },
      { instruction: 'Continue on SH 25 towards Bandikui / Dausa hills', distance: '82 km', duration: '105 min', icon: 'straight' },
      { instruction: 'Connect to Agra-Jaipur Highway into central Jaipur', distance: '76 km', duration: '75 min', icon: 'finish' },
    ],
  },
];

export const MOCK_ALERTS: AlertMarkerData[] = [
  {
    id: 'alert-1',
    type: 'construction',
    title: 'Flyover Structural Widening',
    location: 'NH 48, Dharuhera Km 52',
    coordinates: [76.7900, 28.2100],
    delayMinutes: 14,
    severity: 'high',
    description: 'Right two lanes blocked for bridge girder installation. Traffic filtered through service lane.',
    updatedTime: '6 min ago',
    reportedByCount: 42,
  },
  {
    id: 'alert-2',
    type: 'congestion',
    title: 'Interstate Commercial Inspection Queue',
    location: 'Shahjahanpur Border Checkpost',
    coordinates: [76.3850, 27.9940],
    delayMinutes: 9,
    severity: 'moderate',
    description: 'Commercial vehicle queue spilling into main carriageway. Left lanes moving slowly at 18 km/h.',
    updatedTime: '12 min ago',
    reportedByCount: 28,
  },
  {
    id: 'alert-3',
    type: 'camera',
    title: 'Speed Enforcement Radar (80 km/h)',
    location: 'Kotputli Bypass Elevated Section',
    coordinates: [76.2000, 27.7050],
    delayMinutes: 0,
    severity: 'low',
    description: 'Active automated speed detection radar. Limit strictly enforced at 80 km/h for four-wheelers.',
    updatedTime: 'Verified today',
    reportedByCount: 89,
  },
  {
    id: 'alert-4',
    type: 'toll',
    title: 'Fastag Automated Toll Plaza',
    location: 'Manoharpur Toll Plaza Km 198',
    coordinates: [75.9400, 27.2800],
    delayMinutes: 4,
    severity: 'low',
    description: '6 lanes operational. Dedicated RFID sensors with average wait time under 2 minutes.',
    updatedTime: '4 min ago',
    reportedByCount: 15,
  },
];

export const MOCK_PLACES: PlaceMarkerData[] = [
  {
    id: 'place-cyberhub',
    name: 'DLF CyberHub & NH48 Interchange',
    category: 'landmark',
    coordinates: [77.0300, 28.4710],
    address: 'DLF Cyber City, Sector 24, Gurugram',
    rating: 4.8,
    reviewCount: 3820,
    tags: ['Departure Hub', 'Food Court', 'Metro Station'],
    openNow: true,
    distanceFromRouteKm: 0.1,
    description: 'Primary corporate hub with quick fueling and expressway ramp access.',
  },
  {
    id: 'place-oldrao',
    name: 'Old Rao Dhaba & Food Complex',
    category: 'food',
    coordinates: [76.7950, 28.2120],
    address: 'Near Dharuhera Flyover, NH 48, Haryana',
    rating: 4.5,
    reviewCount: 12450,
    tags: ['North Indian', 'Family Dining', 'Clean Washrooms'],
    openNow: true,
    distanceFromRouteKm: 0.05,
    description: 'Famous highway stop known for stuffed parathas, hot chai, and large parking area.',
  },
  {
    id: 'place-neemrana-king',
    name: 'Highway King Rest Plaza & EV Hub',
    category: 'rest_stop',
    coordinates: [76.3860, 27.9890],
    address: 'NH 48 Mile 114, Neemrana, Rajasthan',
    rating: 4.6,
    reviewCount: 8920,
    tags: ['120kW DC Fast EV Charger', 'Food Court', 'Fuel Station'],
    openNow: true,
    distanceFromRouteKm: 0.0,
    description: 'Major transit hub featuring 6 DC fast chargers, bakery, and 24/7 convenience store.',
  },
  {
    id: 'place-behror-midway',
    name: 'RTDC Hotel Midway Behror',
    category: 'fuel',
    coordinates: [76.2800, 27.8900],
    address: 'NH 48 Behror Bypass, Alwar District',
    rating: 4.3,
    reviewCount: 4210,
    tags: ['Indian Oil Petrol Pump', 'Cafeteria', 'Rest Area'],
    openNow: true,
    distanceFromRouteKm: 0.2,
    description: 'Official tourism transit lodge with certified fuel pumps and well-maintained rest stops.',
  },
  {
    id: 'place-amer-fort',
    name: 'Amer Palace & Maota Lake View',
    category: 'landmark',
    coordinates: [75.8507, 26.9855],
    address: 'Devisinghpura, Amer, Jaipur, Rajasthan',
    rating: 4.9,
    reviewCount: 24900,
    tags: ['UNESCO World Heritage', 'Scenic Overlook', 'Tourist Entry'],
    openNow: true,
    distanceFromRouteKm: 0.8,
    description: 'Historic hilltop citadel visible directly upon entering the northern gateway to Jaipur.',
  },
  {
    id: 'place-hawamahal',
    name: 'Hawa Mahal (Palace of Winds)',
    category: 'landmark',
    coordinates: [75.8267, 26.9239],
    address: 'Hawa Mahal Rd, Badi Choupad, Pink City, Jaipur',
    rating: 4.7,
    reviewCount: 31200,
    tags: ['Destination Point', 'Pink City', 'Cultural Center'],
    openNow: true,
    distanceFromRouteKm: 0.0,
    description: 'Iconic red and pink sandstone landmark in the heart of Jaipur.',
  },
];

export const SAVED_ROUTES_COLLECTION = [
  {
    id: 'saved-1',
    title: 'Gurugram to Jaipur NH 48 Corridor',
    frequency: 'Commuted 4 times this month',
    distance: '242.4 km',
    avgDuration: '4 hr 10 min',
    savedOn: 'Oct 24, 2026',
    favorite: true,
  },
  {
    id: 'saved-2',
    title: 'Delhi Airport to Neemrana Industrial Zone',
    frequency: 'Business commute',
    distance: '118 km',
    avgDuration: '1 hr 55 min',
    savedOn: 'Oct 12, 2026',
    favorite: false,
  },
  {
    id: 'saved-3',
    title: 'Gurugram to Sariska Tiger Reserve via Bhiwadi',
    frequency: 'Weekend trip',
    distance: '184 km',
    avgDuration: '3 hr 30 min',
    savedOn: 'Sep 29, 2026',
    favorite: true,
  },
];
