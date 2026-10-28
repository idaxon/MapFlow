import React from 'react';
import { Star, MapPin, Fuel, Coffee, Zap, X, CornerDownRight } from 'lucide-react';
import type { PlaceMarkerData } from '../types';

interface PlaceMarkerProps {
  place: PlaceMarkerData;
  onClose: () => void;
  onSetAsStop?: (place: PlaceMarkerData) => void;
}

export const PlaceMarker: React.FC<PlaceMarkerProps> = ({
  place,
  onClose,
  onSetAsStop,
}) => {
  const getIcon = () => {
    switch (place.category) {
      case 'fuel':
        return <Fuel className="w-4 h-4 text-amber-400" />;
      case 'food':
        return <Coffee className="w-4 h-4 text-orange-400" />;
      case 'rest_stop':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'landmark':
      default:
        return <MapPin className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="w-72 bg-[#111723] border border-slate-800 rounded-xl p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.7)] text-slate-200">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white leading-snug">{place.name}</h3>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider capitalize">
              {place.category.replace('_', ' ')}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs mb-2">
        <div className="flex items-center gap-1 text-amber-400 font-semibold font-mono">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{place.rating}</span>
        </div>
        <span className="text-slate-500 text-[11px]">({place.reviewCount.toLocaleString()} reviews)</span>
        <span className="text-slate-500">&bull;</span>
        <span className="text-emerald-400 text-[11px] font-medium">Open 24/7</span>
      </div>

      {place.description && (
        <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5">
          {place.description}
        </p>
      )}

      {place.tags && (
        <div className="flex flex-wrap gap-1 mb-3">
          {place.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className="text-slate-400 font-mono">Directly on NH 48</span>
        {onSetAsStop && (
          <button
            onClick={() => onSetAsStop(place)}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <CornerDownRight className="w-3 h-3" />
            <span>Add stop</span>
          </button>
        )}
      </div>
    </div>
  );
};
