import React, { useState } from 'react';
import { Share2, Copy, Check, X, Globe } from 'lucide-react';
import type { RouteOption } from '../types';

interface ShareRouteModalProps {
  route: RouteOption;
  onClose: () => void;
}

export const ShareRouteModal: React.FC<ShareRouteModalProps> = ({ route, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/#origin=Gurugram&destination=Jaipur&route=${route.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111723] border border-slate-800 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150 select-none">
        <div className="p-4 border-b border-slate-800 bg-slate-900/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Share Corridor Route</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <span className="text-xs font-semibold text-white">{route.name}</span>
            <p className="text-xs text-slate-400">
              {route.durationText} &bull; {route.distanceKm} km &bull; ₹{route.tollCost} Toll
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Shareable Direct Link
            </label>
            <div className="flex items-center gap-1.5 bg-[#0b0f17] border border-slate-800 rounded-lg p-1.5">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent text-xs text-slate-300 font-mono flex-1 outline-none px-2 select-all"
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
            <Globe className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Link includes live speed telemetry, road hazards, and toll plaza breakdown.</span>
          </div>
        </div>

        <div className="p-3 border-t border-slate-800 bg-[#0d121c] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-slate-800 text-slate-200 hover:text-white text-xs border border-slate-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
