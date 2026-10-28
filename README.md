# Flow Maps — Real-time Expressway Corridor Navigation (MVP)

A handcrafted, professional frontend-only React MVP inspired by modern navigation and telemetry interfaces. Built for a college project prototype focusing on realistic highway corridors (Gurugram, Haryana &rarr; Jaipur, Rajasthan along NH 48).

---

## 🚀 Key Features

- **Full-Screen Map Canvas**: Powered by **MapLibre GL JS** with OpenStreetMap and CARTO raster/vector compatibility.
- **Realistic NH 48 Corridor**: Pre-loaded with demo geometry, intermediate waypoints (Rajiv Chowk, Kherki Daula, Manesar, Dharuhera, Neemrana, Behror, Kotputli, Manoharpur, Amer, Jaipur).
- **Multi-Level Traffic Segmentation**: Color-coded segments showing real-time speeds:
  - 🟢 **Fast / Clear** (>75 km/h)
  - 🟡 **Moderate** (45–75 km/h)
  - 🟠 **Slow flow** (20–45 km/h)
  - 🔴 **Heavy delay** (<20 km/h)
- **Turn-by-Turn Driving Simulation**: Click **Start Drive** to watch a vehicle glide along the highway corridor with real-time step progress updates.
- **Road Alerts & Hazards**: Detailed contextual pins for flyover structural widening, speed enforcement radar (80 km/h), border queues, and toll delays.
- **Highway Amenities & Stops**: Authentic landmarks and dhabas along the corridor (Old Rao Dhaba, Highway King Neemrana EV Hub, RTDC Behror, Amer Palace, Hawa Mahal).
- **Basemap Layer Switcher**:
  - Dark Matter (Charcoal & slate)
  - Clean Streets
  - Satellite Aerial Imagery
  - Terrain Topography
- **Corridor Route Alternatives**:
  - **NH 48**: 242.4 km &bull; 4 hr 12 min &bull; ₹395 Fastag toll
  - **NE 4 Delhi-Mumbai Expressway**: 278.1 km &bull; 3 hr 55 min &bull; ₹620 toll
  - **State Highway 25 via Alwar**: 258 km &bull; 5 hr 20 min &bull; Toll-free

---

## 🛠️ Tech Stack

- **React 19** + **Vite 8** + **TypeScript**
- **Tailwind CSS v4**
- **MapLibre GL JS**
- **Lucide React Icons**

---

## 📦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

The application will be live at `http://localhost:5173/`.

### 3. Production Build
```bash
npm run build
```

---

## 📁 Component Structure

- [`AppHeader.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/AppHeader.tsx): Compact top navigation with logo, Directions/Explore/Traffic/Saved tabs, and corridor telemetry pill.
- [`RoutePlanner.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/RoutePlanner.tsx): Floating top-left card with origin/destination inputs, mode switcher, departure time, avoid tolls, and route selection.
- [`MapView.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/MapView.tsx): Full-viewport MapLibre GL map with traffic geometry, custom HTML markers, and driving simulation marker.
- [`TrafficLegend.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/TrafficLegend.tsx): Top-right traffic status HUD with live incident counter and layer toggle.
- [`MapControls.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/MapControls.tsx): Vertical controls on the right for zoom, compass orientation, 3D tilt, corridor framing, and fullscreen.
- [`LayerSelector.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/LayerSelector.tsx): Bottom-left dock for switching map styles and toggling overlay markers.
- [`RouteSummary.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/RouteSummary.tsx): Bottom drawer with ETA, Fastag toll estimate, turn-by-turn list, and drive simulation trigger.
- [`PlaceMarker.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/PlaceMarker.tsx): Interactive cards for highway stops, ratings, and amenities.
- [`AlertMarker.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/AlertMarker.tsx): Road alerts with delay times and community verification.
- [`ExplorePanel.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/ExplorePanel.tsx): Drawer for browsing dhabas, EV chargers, and landmarks.
- [`SavedRoutesModal.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/SavedRoutesModal.tsx): Modal for saved journeys and frequently traveled routes.
- [`ShareRouteModal.tsx`](file:///c:/Users/user/Desktop/FlowMAPS/src/components/ShareRouteModal.tsx): Direct link sharing dialog.
