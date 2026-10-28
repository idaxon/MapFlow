import React, { useState } from 'react';
import { Layers, Check, Mountain, Moon, Sun, Globe } from 'lucide-react';
import type { MapLayerType } from '../types';

interface LayerSelectorProps {
  currentLayer: MapLayerType;
  onSelectLayer: (layer: MapLayerType) => void;
  showLandmarks: boolean;
  onToggleLandmarks: () => void;
  showAlerts: boolean;
  onToggleAlerts: () => void;
}

export const LayerSelector: React.FC<LayerSelectorProps> = ({
  currentLayer,
  onSelectLayer,
  showLandmarks,
  onToggleLandmarks,
  showAlerts,
  onToggleAlerts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const layers: { id: MapLayerType; name: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'dark',
      name: 'Dark Canvas',
      icon: <Moon className="w-3.5 h-3.5" />,
      desc: 'High contrast dark canvas',
    },
    {
      id: 'streets',
      name: 'OpenStreetMap',
      icon: <Sun className="w-3.5 h-3.5" />,
      desc: 'Free standard street layout',
    },
    {
      id: 'satellite',
      name: 'Satellite View',
      icon: <Globe className="w-3.5 h-3.5" />,
      desc: 'High-res aerial imagery',
    },
    {
      id: 'terrain',
      name: 'Terrain Topo',
      icon: <Mountain className="w-3.5 h-3.5" />,
      desc: 'Aravalli elevation contours',
    },
  ];

  return (
    <div className="absolute bottom-28 left-4 z-20 select-none">
      {/* Dropup popup menu */}
      {isOpen && (
        <div className="mb-2 w-64 bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.6)] p-2.5 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
            Map Style
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {layers.map((l) => {
              const isSelected = currentLayer === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => {
                    onSelectLayer(l.id);
                  }}
                  className={`flex flex-col text-left p-2 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/50 text-white shadow-sm'
                      : 'bg-[#0b0f17]/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div className="flex items-center gap-1.5">
                      {l.icon}
                      <span className="text-xs font-medium">{l.name}</span>
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] text-slate-400 leading-tight">{l.desc}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
              Overlay Markers
            </div>

            <label className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-slate-800/50 cursor-pointer text-xs text-slate-300">
              <span>Road Alerts & Speed Cameras</span>
              <input
                type="checkbox"
                checked={showAlerts}
                onChange={onToggleAlerts}
                className="rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-slate-800/50 cursor-pointer text-xs text-slate-300">
              <span>Highway Dhabas & Rest Plazas</span>
              <input
                type="checkbox"
                checked={showLandmarks}
                onChange={onToggleLandmarks}
                className="rounded accent-emerald-500 cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111723]/95 backdrop-blur-md border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all text-xs font-medium"
      >
        <Layers className="w-4 h-4 text-emerald-400" />
        <span>Map Layers</span>
        <span className="text-[10px] font-normal text-slate-400 capitalize">({currentLayer})</span>
      </button>
    </div>
  );
};
