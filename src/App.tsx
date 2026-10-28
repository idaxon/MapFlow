import { useState, useEffect, useRef, useCallback } from 'react';
import type { Map as MapLibreMap } from 'maplibre-gl';
import { AppHeader } from './components/AppHeader';
import { RoutePlanner } from './components/RoutePlanner';
import { MapView } from './components/MapView';
import { TrafficLegend } from './components/TrafficLegend';
import { MapControls } from './components/MapControls';
import { LayerSelector } from './components/LayerSelector';
import { RouteSummary } from './components/RouteSummary';
import { PlaceMarker } from './components/PlaceMarker';
import { AlertMarker } from './components/AlertMarker';
import { ExplorePanel } from './components/ExplorePanel';
import { SavedRoutesModal } from './components/SavedRoutesModal';
import { ShareRouteModal } from './components/ShareRouteModal';
import {
  DEFAULT_ORIGIN,
  DEFAULT_DESTINATION,
  MOCK_ROUTES,
  MOCK_ALERTS,
  MOCK_PLACES,
} from './data/mockData';
import type {
  NavTab,
  TransportMode,
  MapLayerType,
  RouteOption,
  PlaceMarkerData,
  AlertMarkerData,
  Waypoint,
} from './types';

export function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<NavTab>('directions');
  const [origin, setOrigin] = useState<Waypoint>(DEFAULT_ORIGIN);
  const [destination, setDestination] = useState<Waypoint>(DEFAULT_DESTINATION);
  const [originText, setOriginText] = useState('Gurugram, Haryana');
  const [destinationText, setDestinationText] = useState('Jaipur, Rajasthan');
  const [transportMode, setTransportMode] = useState<TransportMode>('car');
  const [avoidTolls, setAvoidTolls] = useState(false);

  // Routes
  const [routes, setRoutes] = useState<RouteOption[]>(MOCK_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-nh48');

  // Layer & Display Settings
  const [currentLayer, setCurrentLayer] = useState<MapLayerType>('dark');
  const [showTraffic, setShowTraffic] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [is3D, setIs3D] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Selected Marker Info Cards
  const [selectedPlace, setSelectedPlace] = useState<PlaceMarkerData | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertMarkerData | null>(null);

  // Modals
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Live Navigation Simulation
  const [isNavigating, setIsNavigating] = useState(false);
  const [navCoordIndex, setNavCoordIndex] = useState(0);
  const [currentNavStepIndex, setCurrentNavStepIndex] = useState(0);

  // Map instance ref
  const mapRef = useRef<MapLibreMap | null>(null);

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  // Avoid tolls toggle behavior
  const handleToggleAvoidTolls = () => {
    const nextAvoid = !avoidTolls;
    setAvoidTolls(nextAvoid);
    if (nextAvoid) {
      setSelectedRouteId('route-alwar'); // Free toll route
    } else {
      setSelectedRouteId('route-nh48');
    }
  };

  // Swap origin and destination
  const handleSwapPoints = () => {
    const tempOrigin = origin;
    const tempOriginText = originText;
    setOrigin(destination);
    setOriginText(destinationText);
    setDestination(tempOrigin);
    setDestinationText(tempOriginText);

    // Reverse geometry coordinates for realistic effect
    setRoutes((prev) =>
      prev.map((r) => ({
        ...r,
        coordinates: [...r.coordinates].reverse(),
      }))
    );
  };

  // Reset to default demo corridor
  const handleResetToDemo = () => {
    setOrigin(DEFAULT_ORIGIN);
    setDestination(DEFAULT_DESTINATION);
    setOriginText('Gurugram, Haryana');
    setDestinationText('Jaipur, Rajasthan');
    setRoutes(MOCK_ROUTES);
    setSelectedRouteId('route-nh48');
    setAvoidTolls(false);
    setIsNavigating(false);
    setNavCoordIndex(0);
    setCurrentNavStepIndex(0);
    handleFitBounds();
  };

  // Map Controls
  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut({ duration: 300 });
  };

  const handleFitBounds = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.fitBounds(
        [
          [75.7, 26.8], // Southwest
          [77.2, 28.6], // Northeast
        ],
        {
          padding: { top: 80, bottom: 120, left: 380, right: 80 },
          duration: 900,
        }
      );
    }
  }, []);

  const handleToggle3D = () => {
    setIs3D((prev) => !prev);
  };

  const handleResetNorth = () => {
    if (mapRef.current) {
      mapRef.current.resetNorthPitch({ duration: 500 });
    }
  };

  const handleLocateUser = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: origin.coordinates,
        zoom: 12.5,
        pitch: is3D ? 50 : 0,
        duration: 1200,
      });
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Handle Tab Switch
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'saved') {
      setIsSavedModalOpen(true);
    }
    if (tab === 'traffic') {
      setShowTraffic(true);
    }
  };

  // Turn-by-Turn Driving Simulation Engine
  const toggleNavigation = () => {
    if (isNavigating) {
      setIsNavigating(false);
      setNavCoordIndex(0);
      setCurrentNavStepIndex(0);
    } else {
      setIsNavigating(true);
      setNavCoordIndex(0);
      setCurrentNavStepIndex(0);
    }
  };

  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setNavCoordIndex((prevIndex) => {
        const coords = selectedRoute.coordinates;
        if (prevIndex >= coords.length - 1) {
          setIsNavigating(false);
          return 0;
        }

        const nextIndex = prevIndex + 1;
        // Map coord index progress to steps progress
        const stepProgress = Math.floor(
          (nextIndex / coords.length) * selectedRoute.steps.length
        );
        setCurrentNavStepIndex(
          Math.min(stepProgress, selectedRoute.steps.length - 1)
        );

        return nextIndex;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isNavigating, selectedRoute]);

  const currentNavPosition = selectedRoute.coordinates[navCoordIndex];

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-[#0c0e12] text-slate-100 select-none">
      {/* 1. Compact Top Navigation Bar */}
      <AppHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onShareRoute={() => setIsShareModalOpen(true)}
        onOpenSettings={() => {}}
        liveTrafficCount={MOCK_ALERTS.length}
      />

      {/* Main Map Canvas & Overlay HUDs */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* Full-screen MapLibre Container */}
        <MapView
          origin={origin}
          destination={destination}
          routes={routes}
          selectedRouteId={selectedRouteId}
          onSelectRoute={setSelectedRouteId}
          places={MOCK_PLACES}
          alerts={MOCK_ALERTS}
          showLandmarks={showLandmarks}
          showAlerts={showAlerts}
          showTraffic={showTraffic}
          currentLayer={currentLayer}
          is3D={is3D}
          isNavigating={isNavigating}
          navigationPosition={currentNavPosition}
          onSelectPlace={(place) => {
            setSelectedAlert(null);
            setSelectedPlace(place);
          }}
          onSelectAlert={(alert) => {
            setSelectedPlace(null);
            setSelectedAlert(alert);
          }}
          mapRefCallback={(map) => {
            mapRef.current = map;
          }}
        />

        {/* 2. Floating Route Planner (Top-Left) */}
        {activeTab !== 'explore' && (
          <RoutePlanner
            originText={originText}
            destinationText={destinationText}
            onOriginChange={setOriginText}
            onDestinationChange={setDestinationText}
            onSwapPoints={handleSwapPoints}
            transportMode={transportMode}
            onModeChange={setTransportMode}
            routes={routes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            avoidTolls={avoidTolls}
            onToggleAvoidTolls={handleToggleAvoidTolls}
            onResetToDemo={handleResetToDemo}
          />
        )}

        {/* Explore Panel Drawer (Top-Left, when 'explore' tab selected) */}
        {activeTab === 'explore' && (
          <ExplorePanel
            places={MOCK_PLACES}
            onSelectPlace={(place) => {
              setSelectedPlace(place);
              if (mapRef.current) {
                mapRef.current.flyTo({
                  center: place.coordinates,
                  zoom: 12,
                  duration: 800,
                });
              }
            }}
            onClose={() => setActiveTab('directions')}
          />
        )}

        {/* 3. Traffic Legend (Top-Right) */}
        <TrafficLegend
          showTraffic={showTraffic}
          onToggleTraffic={() => setShowTraffic(!showTraffic)}
          activeIncidentsCount={MOCK_ALERTS.length}
        />

        {/* 4. Vertical Map Controls (Right) */}
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFitBounds={handleFitBounds}
          onToggle3D={handleToggle3D}
          is3D={is3D}
          onResetNorth={handleResetNorth}
          onLocateUser={handleLocateUser}
          onToggleFullscreen={handleToggleFullscreen}
          isFullscreen={isFullscreen}
        />

        {/* 5. Layer Selector (Bottom-Left) */}
        <LayerSelector
          currentLayer={currentLayer}
          onSelectLayer={setCurrentLayer}
          showLandmarks={showLandmarks}
          onToggleLandmarks={() => setShowLandmarks(!showLandmarks)}
          showAlerts={showAlerts}
          onToggleAlerts={() => setShowAlerts(!showAlerts)}
        />

        {/* 6. Wide Route-Summary Panel (Bottom) */}
        <RouteSummary
          route={selectedRoute}
          isNavigating={isNavigating}
          onToggleNavigation={toggleNavigation}
          currentNavStepIndex={currentNavStepIndex}
          onSelectStepIndex={(idx) => {
            const fraction = idx / selectedRoute.steps.length;
            const targetCoordIndex = Math.floor(
              fraction * selectedRoute.coordinates.length
            );
            const targetCoord = selectedRoute.coordinates[targetCoordIndex];
            if (mapRef.current && targetCoord) {
              mapRef.current.flyTo({
                center: targetCoord,
                zoom: 11,
                duration: 700,
              });
            }
          }}
        />

        {/* Interactive Floating Context Cards on Map Click */}
        {selectedPlace && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 md:left-auto md:right-20 md:top-24 z-30 animate-in fade-in zoom-in-95 duration-150">
            <PlaceMarker
              place={selectedPlace}
              onClose={() => setSelectedPlace(null)}
              onSetAsStop={(place) => {
                alert(`Added stop "${place.name}" along NH 48 corridor!`);
                setSelectedPlace(null);
              }}
            />
          </div>
        )}

        {selectedAlert && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 md:left-auto md:right-20 md:top-24 z-30 animate-in fade-in zoom-in-95 duration-150">
            <AlertMarker
              alert={selectedAlert}
              onClose={() => setSelectedAlert(null)}
              onUpvote={() => {}}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {isSavedModalOpen && (
        <SavedRoutesModal
          onClose={() => setIsSavedModalOpen(false)}
          onLoadSavedRoute={(_id) => {
            setSelectedRouteId('route-nh48');
            setActiveTab('directions');
            handleFitBounds();
          }}
        />
      )}

      {isShareModalOpen && (
        <ShareRouteModal
          route={selectedRoute}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
