import React, { useEffect, useRef, useCallback } from 'react';
import { Map as MapLibreMap, Marker } from 'maplibre-gl';
import type {
  RouteOption,
  PlaceMarkerData,
  AlertMarkerData,
  Waypoint,
  MapLayerType,
} from '../types';
import { getMapStyle } from '../utils/mapStyles';

interface MapViewProps {
  origin: Waypoint;
  destination: Waypoint;
  routes: RouteOption[];
  selectedRouteId: string;
  onSelectRoute?: (id: string) => void;
  places: PlaceMarkerData[];
  alerts: AlertMarkerData[];
  showLandmarks: boolean;
  showAlerts: boolean;
  showTraffic: boolean;
  currentLayer: MapLayerType;
  is3D: boolean;
  isNavigating: boolean;
  navigationPosition?: [number, number];
  onSelectPlace: (place: PlaceMarkerData) => void;
  onSelectAlert: (alert: AlertMarkerData) => void;
  mapRefCallback?: (map: MapLibreMap | null) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  origin,
  destination,
  routes,
  selectedRouteId,
  places,
  alerts,
  showLandmarks,
  showAlerts,
  showTraffic,
  currentLayer,
  is3D,
  isNavigating,
  navigationPosition,
  onSelectPlace,
  onSelectAlert,
  mapRefCallback,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const carMarkerRef = useRef<Marker | null>(null);
  const isLoadedRef = useRef(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center between Gurugram and Jaipur
    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: getMapStyle(currentLayer),
      center: [76.42, 27.7],
      zoom: 7.8,
      pitch: is3D ? 52 : 0,
      bearing: -12,
      attributionControl: { compact: true },
    });

    mapInstanceRef.current = map;
    if (mapRefCallback) mapRefCallback(map);

    map.on('load', () => {
      isLoadedRef.current = true;
      updateRouteLayers(map);
    });

    // Cleanup
    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (carMarkerRef.current) carMarkerRef.current.remove();
      map.remove();
      mapInstanceRef.current = null;
      if (mapRefCallback) mapRefCallback(null);
    };
  }, []);

  // Update pitch when is3D changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({
      pitch: is3D ? 55 : 0,
      bearing: is3D ? -18 : 0,
      duration: 800,
    });
  }, [is3D]);

  // Handle Layer change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setStyle(getMapStyle(currentLayer));

    // When new style is loaded, re-render routes
    const onStyleData = () => {
      if (map.isStyleLoaded()) {
        updateRouteLayers(map);
      }
    };

    map.once('styledata', onStyleData);
  }, [currentLayer]);

  // Update GeoJSON route lines
  const updateRouteLayers = useCallback(
    (map: MapLibreMap) => {
      if (!map || !map.isStyleLoaded()) return;

      // 1. Remove existing route layers and sources
      const existingLayers = [
        'route-casing',
        'route-inactive',
        'route-traffic-clear',
        'route-traffic-moderate',
        'route-traffic-slow',
        'route-traffic-heavy',
        'route-selected-line',
      ];
      existingLayers.forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
      });

      const existingSources = [
        'source-selected-route',
        'source-inactive-routes',
        'source-traffic-clear',
        'source-traffic-moderate',
        'source-traffic-slow',
        'source-traffic-heavy',
      ];
      existingSources.forEach((id) => {
        if (map.getSource(id)) map.removeSource(id);
      });

      const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];
      const inactiveRoutes = routes.filter((r) => r.id !== selectedRouteId);

      // Add Inactive Routes
      if (inactiveRoutes.length > 0) {
        map.addSource('source-inactive-routes', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: inactiveRoutes.map((r) => ({
              type: 'Feature',
              properties: { id: r.id, name: r.name },
              geometry: {
                type: 'LineString',
                coordinates: r.coordinates,
              },
            })),
          },
        });

        map.addLayer({
          id: 'route-inactive',
          type: 'line',
          source: 'source-inactive-routes',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#475569',
            'line-width': 4.5,
            'line-opacity': 0.6,
            'line-dasharray': [2, 1.5],
          },
        });
      }

      // Add Selected Route Casing (dark halo outline)
      map.addSource('source-selected-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: selectedRoute.coordinates,
          },
        },
      });

      map.addLayer({
        id: 'route-casing',
        type: 'line',
        source: 'source-selected-route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#080a10',
          'line-width': 9,
          'line-opacity': 0.9,
        },
      });

      // If Traffic is enabled and segments exist, render traffic colored segments
      if (showTraffic && selectedRoute.trafficSegments && selectedRoute.trafficSegments.length > 0) {
        const statuses = [
          { status: 'clear', color: '#10b981', layerId: 'route-traffic-clear' },
          { status: 'moderate', color: '#fbbf24', layerId: 'route-traffic-moderate' },
          { status: 'slow', color: '#f97316', layerId: 'route-traffic-slow' },
          { status: 'heavy', color: '#ef4444', layerId: 'route-traffic-heavy' },
        ];

        statuses.forEach(({ status, color, layerId }) => {
          const segs = selectedRoute.trafficSegments.filter((s) => s.status === status);
          if (segs.length > 0) {
            map.addSource(`source-traffic-${status}`, {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: segs.map((s) => ({
                  type: 'Feature',
                  properties: { name: s.name },
                  geometry: {
                    type: 'LineString',
                    coordinates: s.coordinates,
                  },
                })),
              },
            });

            map.addLayer({
              id: layerId,
              type: 'line',
              source: `source-traffic-${status}`,
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': color,
                'line-width': 5.5,
              },
            });
          }
        });
      } else {
        // Plain solid blue/emerald route line
        map.addLayer({
          id: 'route-selected-line',
          type: 'line',
          source: 'source-selected-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 5.5,
          },
        });
      }
    },
    [routes, selectedRouteId, showTraffic]
  );

  // Re-run route layer update when selectedRoute or traffic changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && isLoadedRef.current) {
      updateRouteLayers(map);
    }
  }, [routes, selectedRouteId, showTraffic, updateRouteLayers]);

  // Update Markers (Origin, Destination, Places, Alerts)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // 1. Origin Marker (Gurugram)
    const originEl = document.createElement('div');
    originEl.className = 'group cursor-pointer select-none';
    originEl.innerHTML = `
      <div class="flex items-center gap-1.5 bg-[#0f172a] border border-emerald-500/80 px-2.5 py-1 rounded-full shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:scale-105 transition-transform">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-500/40"></span>
        <span class="text-[11px] font-semibold text-white tracking-wide">A: Gurugram</span>
      </div>
      <div class="w-0.5 h-3 bg-emerald-500 mx-auto"></div>
    `;
    const originMarker = new Marker({ element: originEl, anchor: 'bottom' })
      .setLngLat(origin.coordinates)
      .addTo(map);
    markersRef.current.push(originMarker);

    // 2. Destination Marker (Jaipur)
    const destEl = document.createElement('div');
    destEl.className = 'group cursor-pointer select-none';
    destEl.innerHTML = `
      <div class="flex items-center gap-1.5 bg-[#0f172a] border border-rose-500/80 px-2.5 py-1 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.35)] hover:scale-105 transition-transform">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-500/40"></span>
        <span class="text-[11px] font-semibold text-white tracking-wide">B: Jaipur</span>
      </div>
      <div class="w-0.5 h-3 bg-rose-500 mx-auto"></div>
    `;
    const destMarker = new Marker({ element: destEl, anchor: 'bottom' })
      .setLngLat(destination.coordinates)
      .addTo(map);
    markersRef.current.push(destMarker);

    // 3. Place Markers (if enabled)
    if (showLandmarks) {
      places.forEach((p) => {
        const placeEl = document.createElement('div');
        placeEl.className = 'cursor-pointer hover:scale-110 transition-transform';

        let iconSvg = '📍';
        if (p.category === 'food') {
          iconSvg = '🍽️';
        } else if (p.category === 'fuel') {
          iconSvg = '⛽';
        } else if (p.category === 'rest_stop') {
          iconSvg = '⚡';
        }

        placeEl.innerHTML = `
          <div class="flex items-center gap-1 bg-[#111723]/95 border border-slate-700/80 px-2 py-0.5 rounded-md shadow-lg text-[10px] text-slate-200">
            <span class="text-[11px]">${iconSvg}</span>
            <span class="font-medium truncate max-w-[100px]">${p.name.split(' ')[0]}</span>
          </div>
        `;

        placeEl.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelectPlace(p);
        });

        const m = new Marker({ element: placeEl, anchor: 'center' })
          .setLngLat(p.coordinates)
          .addTo(map);
        markersRef.current.push(m);
      });
    }

    // 4. Alert Markers (if enabled)
    if (showAlerts) {
      alerts.forEach((a) => {
        const alertEl = document.createElement('div');
        alertEl.className = 'cursor-pointer hover:scale-110 transition-transform';

        let badgeBg = 'bg-rose-500/90 text-white';
        let alertIcon = '⚠️';
        if (a.type === 'construction') {
          badgeBg = 'bg-orange-500/90 text-white';
          alertIcon = '🚧';
        } else if (a.type === 'camera') {
          badgeBg = 'bg-blue-500/90 text-white';
          alertIcon = '📷';
        } else if (a.type === 'toll') {
          badgeBg = 'bg-emerald-600/90 text-white';
          alertIcon = '💳';
        }

        alertEl.innerHTML = `
          <div class="flex items-center gap-1 ${badgeBg} px-2 py-0.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/20 text-[10px] font-semibold">
            <span>${alertIcon}</span>
            <span>${a.delayMinutes > 0 ? `+${a.delayMinutes}m` : a.type}</span>
          </div>
        `;

        alertEl.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelectAlert(a);
        });

        const m = new Marker({ element: alertEl, anchor: 'center' })
          .setLngLat(a.coordinates)
          .addTo(map);
        markersRef.current.push(m);
      });
    }
  }, [origin, destination, places, alerts, showLandmarks, showAlerts, onSelectPlace, onSelectAlert]);

  // Live Navigation Car / Position Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (isNavigating && navigationPosition) {
      if (!carMarkerRef.current) {
        const carEl = document.createElement('div');
        carEl.className = 'select-none pointer-events-none';
        carEl.innerHTML = `
          <div class="relative flex items-center justify-center">
            <span class="w-8 h-8 rounded-full bg-emerald-500/25 animate-ping absolute"></span>
            <div class="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_16px_rgba(16,185,129,0.9)] flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
            </div>
          </div>
        `;
        carMarkerRef.current = new Marker({ element: carEl, anchor: 'center' })
          .setLngLat(navigationPosition)
          .addTo(map);
      } else {
        carMarkerRef.current.setLngLat(navigationPosition);
      }

      // Smooth pan map to follow car if navigating
      map.easeTo({
        center: navigationPosition,
        zoom: Math.max(map.getZoom(), 10.5),
        duration: 1000,
      });
    } else {
      if (carMarkerRef.current) {
        carMarkerRef.current.remove();
        carMarkerRef.current = null;
      }
    }
  }, [isNavigating, navigationPosition]);

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden bg-[#0c0e12]">
      {/* MapLibre Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Demo watermark overlay in map corner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-[11px] text-slate-300 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-medium">Live Demo Geometry: Gurugram (HR) &rarr; Jaipur (RJ)</span>
          <span className="text-slate-500">&bull;</span>
          <span className="text-slate-400 font-mono">NH 48</span>
        </div>
      </div>
    </div>
  );
};
