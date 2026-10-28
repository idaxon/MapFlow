import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Search,
} from 'lucide-react';
import type { PlaceMarkerData } from '../types';

interface ExplorePanelProps {
  places: PlaceMarkerData[];
  onSelectPlace: (place: PlaceMarkerData) => void;
  onClose: () => void;
}

export const ExplorePanel: React.FC<ExplorePanelProps> = ({
  places,
  onSelectPlace,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Stops' },
    { id: 'food', label: 'Dhabas & Food' },
    { id: 'fuel', label: 'Fuel Stations' },
    { id: 'rest_stop', label: 'EV & Rest Hubs' },
    { id: 'landmark', label: 'Landmarks' },
  ];

  const filteredPlaces = places.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="absolute top-4 left-4 z-20 w-[380px] max-w-[calc(100vw-2rem)] bg-[#111723]/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col max-h-[calc(100vh-140px)] select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Explore Corridor Stops
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search & Filter Categories */}
      <div className="p-3 border-b border-slate-800 space-y-2 bg-[#0d121c]/70">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Dhabas, EV chargers, landmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151c2a] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedCategory === c.id
                  ? 'bg-slate-800 text-white border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Places List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No places found matching your filter.
          </div>
        ) : (
          filteredPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => onSelectPlace(place)}
              className="p-3 rounded-lg bg-[#0e1420]/80 border border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700 cursor-pointer transition-all space-y-1.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">{place.name}</h4>
                  <p className="text-[11px] text-slate-400">{place.address}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-semibold shrink-0">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{place.rating}</span>
                </div>
              </div>

              {place.description && (
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1">
                  {place.tags.slice(0, 2).map((t, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">View on Map &rarr;</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
