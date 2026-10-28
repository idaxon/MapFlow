import React from 'react';
import { Bookmark, Star, Route, ArrowRight, X } from 'lucide-react';
import { SAVED_ROUTES_COLLECTION } from '../data/mockData';

interface SavedRoutesModalProps {
  onClose: () => void;
  onLoadSavedRoute: (routeId: string) => void;
}

export const SavedRoutesModal: React.FC<SavedRoutesModalProps> = ({
  onClose,
  onLoadSavedRoute,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111723] border border-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Saved Routes & Corridors</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of saved routes */}
        <div className="p-4 space-y-2.5 max-h-[420px] overflow-y-auto">
          {SAVED_ROUTES_COLLECTION.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onLoadSavedRoute(item.id);
                onClose();
              }}
              className="p-3.5 rounded-lg bg-[#0e1420] border border-slate-800/90 hover:bg-slate-800/60 hover:border-slate-700 cursor-pointer transition-all group space-y-1.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Route className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </span>
                </div>
                {item.favorite && (
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{item.distance}</span>
                <span>&bull;</span>
                <span>{item.avgDuration}</span>
                <span>&bull;</span>
                <span className="text-[11px] text-slate-500 font-sans">{item.frequency}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px]">
                <span className="text-slate-500">Saved on {item.savedOn}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                  Load Corridor <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#0d121c] flex items-center justify-between text-xs text-slate-400">
          <span>Synced locally to your workspace</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
