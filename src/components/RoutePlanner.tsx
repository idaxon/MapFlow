import React, { useState } from 'react';
import {
  Car,
  Bus,
  Bike,
  Footprints,
  ArrowUpDown,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  CircleDot,
  Check,
} from 'lucide-react';
import type { TransportMode, RouteOption } from '../types';

interface RoutePlannerProps {
  originText: string;
  destinationText: string;
  onOriginChange: (text: string) => void;
  onDestinationChange: (text: string) => void;
  onSwapPoints: () => void;
  transportMode: TransportMode;
  onModeChange: (mode: TransportMode) => void;
  routes: RouteOption[];
  selectedRouteId: string;
  onSelectRoute: (id: string) => void;
  avoidTolls: boolean;
  onToggleAvoidTolls: () => void;
  onResetToDemo: () => void;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  originText,
  destinationText,
  onOriginChange,
  onDestinationChange,
  onSwapPoints,
  transportMode,
  onModeChange,
  routes,
  selectedRouteId,
  onSelectRoute,
  avoidTolls,
  onToggleAvoidTolls,
  onResetToDemo,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [departureTime, setDepartureTime] = useState<'now' | 'leave_at'>('now');
  const [customTime, setCustomTime] = useState('14:30');

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  return (
    <div className="absolute top-4 left-4 z-20 w-[360px] max-w-[calc(100vw-2rem)] select-none">
      <div className="bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.55)] overflow-hidden transition-all duration-200">
        {/* Card Header */}
        <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Route Planner
            </h2>
            <span className="text-[11px] text-slate-400 font-normal">
              &bull; NH 48 corridor
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isCollapsed ? 'Expand planner' : 'Collapse planner'}
            >
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {!isCollapsed && (
          <div className="p-3.5 space-y-3">
            {/* Mode Selector */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#0b0f17] rounded-lg border border-slate-800/70">
              <button
                type="button"
                onClick={() => onModeChange('car')}
                className={`flex flex-col items-center justify-center py-1.5 rounded-md text-[11px] font-medium transition-all ${
                  transportMode === 'car'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Car className="w-3.5 h-3.5 mb-0.5" />
                <span>Drive</span>
              </button>

              <button
                type="button"
                onClick={() => onModeChange('transit')}
                className={`flex flex-col items-center justify-center py-1.5 rounded-md text-[11px] font-medium transition-all ${
                  transportMode === 'transit'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bus className="w-3.5 h-3.5 mb-0.5" />
                <span>Transit</span>
              </button>

              <button
                type="button"
                onClick={() => onModeChange('bike')}
                className={`flex flex-col items-center justify-center py-1.5 rounded-md text-[11px] font-medium transition-all ${
                  transportMode === 'bike'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bike className="w-3.5 h-3.5 mb-0.5" />
                <span>Motorcycle</span>
              </button>

              <button
                type="button"
                onClick={() => onModeChange('walking')}
                className={`flex flex-col items-center justify-center py-1.5 rounded-md text-[11px] font-medium transition-all ${
                  transportMode === 'walking'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Footprints className="w-3.5 h-3.5 mb-0.5" />
                <span>Walk</span>
              </button>
            </div>

            {/* Origin & Destination Inputs with Connector Line */}
            <div className="relative bg-[#0b0f17]/90 rounded-lg p-2.5 border border-slate-800/80">
              {/* Connector line between dots */}
              <div className="absolute left-[23px] top-[26px] bottom-[26px] w-[1.5px] border-l border-dashed border-slate-600" />

              {/* Origin */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 z-10">
                  <CircleDot className="w-3 h-3 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={originText}
                    onChange={(e) => onOriginChange(e.target.value)}
                    placeholder="Starting point"
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 rounded px-1.5 py-1"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center text-rose-400 shrink-0 z-10">
                  <MapPin className="w-3 h-3 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={destinationText}
                    onChange={(e) => onDestinationChange(e.target.value)}
                    placeholder="Destination point"
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/40 rounded px-1.5 py-1"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={onSwapPoints}
                title="Swap origin and destination"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/60 transition-colors shadow-sm"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Departure Time & Route Preferences */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value as 'now' | 'leave_at')}
                  className="bg-[#0b0f17] text-slate-200 border border-slate-800 rounded px-2 py-1 text-[11px] focus:outline-none"
                >
                  <option value="now">Leave now</option>
                  <option value="leave_at">Depart at...</option>
                </select>
                {departureTime === 'leave_at' && (
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="bg-[#0b0f17] text-slate-200 border border-slate-800 rounded px-1.5 py-0.5 text-[11px] focus:outline-none"
                  />
                )}
              </div>

              {/* Avoid Tolls Checkbox */}
              <button
                type="button"
                onClick={onToggleAvoidTolls}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  avoidTolls
                    ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                    avoidTolls ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                  }`}
                >
                  {avoidTolls && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                </div>
                <span>Avoid tolls</span>
              </button>
            </div>

            {/* Route Options Quick Switcher */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Select Corridor Route
              </span>
              <div className="space-y-1.5">
                {routes.map((route) => {
                  const isSelected = route.id === selectedRouteId;
                  return (
                    <div
                      key={route.id}
                      onClick={() => onSelectRoute(route.id)}
                      className={`p-2.5 rounded-lg cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-slate-800/90 border-emerald-500/50 shadow-[0_2px_10px_rgba(16,185,129,0.1)]'
                          : 'bg-[#0b0f17]/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-emerald-400' : 'bg-slate-600'
                            }`}
                          />
                          <span className="text-xs font-medium text-slate-200">
                            {route.name}
                          </span>
                        </div>
                        {route.badge && (
                          <span
                            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                              route.isFastest
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                            }`}
                          >
                            {route.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 pl-4">
                        <span>{route.via}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-slate-200 font-semibold">{route.durationText}</span>
                          <span className="text-slate-500">({route.distanceKm} km)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset to Demo corridor button */}
            <div className="pt-1 flex items-center justify-between border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-500">Live Highway Telemetry</span>
              <button
                type="button"
                onClick={onResetToDemo}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Reset Corridor
              </button>
            </div>
          </div>
        )}

        {/* Minimized View Header Summary */}
        {isCollapsed && (
          <div
            onClick={() => setIsCollapsed(false)}
            className="p-3 cursor-pointer hover:bg-slate-800/40 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white">
                  {originText.split(',')[0]} &rarr; {destinationText.split(',')[0]}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {selectedRoute.durationText} &bull; {selectedRoute.distanceKm} km
                </span>
              </div>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">Expand</span>
          </div>
        )}
      </div>
    </div>
  );
};
