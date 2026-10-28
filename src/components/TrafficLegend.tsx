import React, { useState } from 'react';
import { Eye, EyeOff, Activity, ChevronRight, ChevronDown } from 'lucide-react';

interface TrafficLegendProps {
  showTraffic: boolean;
  onToggleTraffic: () => void;
  activeIncidentsCount: number;
}

export const TrafficLegend: React.FC<TrafficLegendProps> = ({
  showTraffic,
  onToggleTraffic,
  activeIncidentsCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute top-4 right-4 z-20 select-none">
      <div className="bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.55)] overflow-hidden transition-all duration-200 w-[240px]">
        {/* Header */}
        <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-200">Traffic Status</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleTraffic}
              className={`p-1 rounded text-xs transition-colors ${
                showTraffic
                  ? 'text-emerald-400 hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
              title={showTraffic ? 'Hide traffic layer' : 'Show traffic layer'}
            >
              {showTraffic ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-3 space-y-2.5 text-[11px]">
            {/* Traffic categories */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-slate-300">Fast / Clear</span>
                </div>
                <span className="text-slate-500 font-mono">&gt;75 km/h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                  <span className="text-slate-300">Moderate</span>
                </div>
                <span className="text-slate-500 font-mono">45-75 km/h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                  <span className="text-slate-300">Slow flow</span>
                </div>
                <span className="text-slate-500 font-mono">20-45 km/h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  <span className="text-slate-300">Heavy delay</span>
                </div>
                <span className="text-slate-500 font-mono">&lt;20 km/h</span>
              </div>
            </div>

            {/* Live corridor state */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400">
              <span>Active incidents</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                {activeIncidentsCount} bottlenecks
              </span>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Telemetry updated 30s ago</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
