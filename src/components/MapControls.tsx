import React from 'react';
import {
  Plus,
  Minus,
  LocateFixed,
  Compass,
  Maximize2,
  Minimize2,
  Box,
  Crosshair,
} from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitBounds: () => void;
  onToggle3D: () => void;
  is3D: boolean;
  onResetNorth: () => void;
  onLocateUser: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onFitBounds,
  onToggle3D,
  is3D,
  onResetNorth,
  onLocateUser,
  onToggleFullscreen,
  isFullscreen,
}) => {
  return (
    <div className="absolute top-28 right-4 z-20 flex flex-col gap-2 select-none">
      {/* Zoom Group */}
      <div className="bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        <button
          onClick={onZoomIn}
          title="Zoom In"
          className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border-b border-slate-800/80"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          title="Zoom Out"
          className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Orientation & 3D Group */}
      <div className="bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        <button
          onClick={onResetNorth}
          title="Reset North orientation"
          className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border-b border-slate-800/80"
        >
          <Compass className="w-4 h-4 text-rose-400" />
        </button>
        <button
          onClick={onToggle3D}
          title={is3D ? 'Switch to 2D flat view' : 'Switch to 3D perspective'}
          className={`w-9 h-9 flex items-center justify-center transition-colors border-b border-slate-800/80 ${
            is3D
              ? 'text-emerald-400 bg-emerald-500/10'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Box className="w-4 h-4" />
        </button>
        <button
          onClick={onFitBounds}
          title="Fit full Gurugram - Jaipur corridor in view"
          className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <Crosshair className="w-4 h-4" />
        </button>
      </div>

      {/* Location & Screen Group */}
      <div className="bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        <button
          onClick={onLocateUser}
          title="Focus on Gurugram departure point"
          className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border-b border-slate-800/80"
        >
          <LocateFixed className="w-4 h-4 text-emerald-400" />
        </button>
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
