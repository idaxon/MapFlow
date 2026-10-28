import React from 'react';
import {
  Navigation,
  Compass,
  Radio,
  Bookmark,
  Share2,
  SlidersHorizontal,
  Route as RouteIcon,
} from 'lucide-react';
import type { NavTab } from '../types';

interface AppHeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSettings?: () => void;
  onShareRoute?: () => void;
  liveTrafficCount: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenSettings,
  onShareRoute,
  liveTrafficCount,
}) => {
  return (
    <header className="h-14 bg-[#0d121c]/95 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between select-none z-30 relative shadow-sm">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onTabChange('directions')}>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <RouteIcon className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px] tracking-tight text-white">Flow Maps</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60 uppercase tracking-wider">
                MVP
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Real-time Expressway Corridor</span>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="h-5 w-px bg-slate-800 mx-2 hidden sm:block" />

        {/* Corridor Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/40 text-[11px] text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>NH 48 corridor</span>
          <span className="text-slate-500">&bull;</span>
          <span className="text-slate-400">Gurugram &rarr; Jaipur</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1 bg-[#131926] p-1 rounded-lg border border-slate-800/70 shadow-inner">
        <button
          onClick={() => onTabChange('directions')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeTab === 'directions'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </button>

        <button
          onClick={() => onTabChange('explore')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeTab === 'explore'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore</span>
        </button>

        <button
          onClick={() => onTabChange('traffic')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all relative ${
            activeTab === 'traffic'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Traffic</span>
          {liveTrafficCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
          )}
        </button>

        <button
          onClick={() => onTabChange('saved')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeTab === 'saved'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved</span>
        </button>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onShareRoute}
          title="Share route link"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Share</span>
        </button>

        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            title="Map Preferences"
            className="p-1.5 rounded-md text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
