import React, { useState } from 'react';
import {
  Clock,
  Navigation,
  CreditCard,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  ListOrdered,
  ShieldCheck,
  Fuel,
  X,
  Square,
} from 'lucide-react';
import type { RouteOption } from '../types';

interface RouteSummaryProps {
  route: RouteOption;
  isNavigating: boolean;
  onToggleNavigation: () => void;
  onSelectStepIndex?: (index: number) => void;
  currentNavStepIndex: number;
}

export const RouteSummary: React.FC<RouteSummaryProps> = ({
  route,
  isNavigating,
  onToggleNavigation,
  onSelectStepIndex,
  currentNavStepIndex,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'tolls'>('overview');

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-[390px] md:right-16 z-20 select-none">
      <div className="bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-200">
        {/* Navigation In-Progress Header Banner (if active) */}
        {isNavigating && (
          <div className="bg-emerald-600/90 text-white px-4 py-2 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>Simulated Navigation Mode Active</span>
              <span className="text-emerald-200 font-mono">
                Step {currentNavStepIndex + 1} of {route.steps.length}
              </span>
            </div>
            <button
              onClick={onToggleNavigation}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/20 hover:bg-black/30 transition-colors"
            >
              <Square className="w-3 h-3 fill-white" />
              <span>End Drive</span>
            </button>
          </div>
        )}

        {/* Main Bar */}
        <div className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Duration, ETA, Distance & Status */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
                  {route.durationText}
                </span>
                <span className="text-xs text-slate-400 font-mono">ETA {route.eta}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-slate-300 font-semibold">{route.distanceKm} km</span>
                <span>&bull;</span>
                <span className="text-slate-300 truncate max-w-[220px]">{route.name}</span>
              </div>
            </div>

            {/* Delay & Toll Badges */}
            <div className="hidden sm:flex flex-wrap items-center gap-1.5 pl-3 border-l border-slate-800">
              {route.delayMinutes > 0 ? (
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
                  <AlertTriangle className="w-3 h-3" />
                  <span>+{route.delayMinutes} min delay</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-300 font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Normal traffic</span>
                </div>
              )}

              <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700/60 text-[11px] text-slate-300 font-medium">
                <CreditCard className="w-3 h-3 text-slate-400" />
                <span>₹{route.tollCost} Fastag</span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 self-end md:self-center">
            {/* Steps button */}
            <button
              onClick={() => {
                setIsExpanded(!isExpanded);
                if (!isExpanded) setActiveTab('steps');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                isExpanded && activeTab === 'steps'
                  ? 'bg-slate-800 text-white border-slate-600'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/60'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Route Steps</span>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Start navigation / Drive simulation */}
            <button
              onClick={onToggleNavigation}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition-all ${
                isNavigating
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/40'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
              }`}
            >
              {isNavigating ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Navigation className="w-3.5 h-3.5 fill-white" />
                  <span>Start Drive</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expanded Drawer (Turn-by-turn instructions, toll list, bottlenecks) */}
        {isExpanded && (
          <div className="border-t border-slate-800 bg-[#0d121c] p-4 max-h-72 overflow-y-auto">
            {/* Drawer Sub-tabs */}
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('steps')}
                  className={`text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'steps'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Turn-by-Turn ({route.steps.length})
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Corridor Breakdown
                </button>
                <button
                  onClick={() => setActiveTab('tolls')}
                  className={`text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'tolls'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tolls & Plazas
                </button>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab: Turn-by-Turn Steps */}
            {activeTab === 'steps' && (
              <div className="space-y-2">
                {route.steps.map((step, idx) => {
                  const isActive = isNavigating && currentNavStepIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectStepIndex && onSelectStepIndex(idx)}
                      className={`p-2.5 rounded-lg border flex items-start gap-3 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                          : 'bg-[#111723]/60 border-slate-800/70 hover:bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-300 shrink-0 mt-0.5">
                        {idx + 1}
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-200">{step.instruction}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-1">
                          <span>{step.distance}</span>
                          <span>&bull;</span>
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab: Overview & Highlights */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#111723]/60 border border-slate-800/80 p-3 rounded-lg space-y-2">
                  <h4 className="text-xs font-semibold text-slate-200">Route Overview</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{route.summary}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{route.description}</p>
                </div>

                <div className="bg-[#111723]/60 border border-slate-800/80 p-3 rounded-lg space-y-2">
                  <h4 className="text-xs font-semibold text-slate-200">Highway Amenities</h4>
                  <div className="text-xs text-slate-300 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-3.5 h-3.5 text-amber-400" />
                      <span>28 Fuel & EV Charging stations along corridor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Recommended rest stop: Neemrana Mile 114 (Highway King)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>Highway patrol emergency response: 1033 active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Toll Plazas */}
            {activeTab === 'tolls' && (
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-[#111723]/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-white">Kherki Daula Toll Plaza (Km 42)</span>
                    <p className="text-[11px] text-slate-400">Electronic Fastag &bull; Lane 4-7 open</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">₹85</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#111723]/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-white">Shahjahanpur Toll Plaza (Km 110)</span>
                    <p className="text-[11px] text-slate-400">Haryana-Rajasthan border entry</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">₹175</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#111723]/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-white">Manoharpur Toll Plaza (Km 198)</span>
                    <p className="text-[11px] text-slate-400">Jaipur Northern Gateway approach</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">₹135</span>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-medium border-t border-slate-800 text-slate-200">
                  <span>Total Estimated Toll</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{route.tollCost}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
