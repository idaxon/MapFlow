import React, { useState } from 'react';
import {
  AlertTriangle,
  HardHat,
  Camera,
  CreditCard,
  Clock,
  ThumbsUp,
  X,
} from 'lucide-react';
import type { AlertMarkerData } from '../types';

interface AlertMarkerProps {
  alert: AlertMarkerData;
  onClose: () => void;
  onUpvote?: (id: string) => void;
}

export const AlertMarker: React.FC<AlertMarkerProps> = ({
  alert,
  onClose,
  onUpvote,
}) => {
  const [upvoted, setUpvoted] = useState(false);

  const getAlertDetails = () => {
    switch (alert.type) {
      case 'construction':
        return {
          icon: <HardHat className="w-4 h-4 text-orange-400" />,
          badgeClass: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
        };
      case 'camera':
        return {
          icon: <Camera className="w-4 h-4 text-blue-400" />,
          badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        };
      case 'toll':
        return {
          icon: <CreditCard className="w-4 h-4 text-emerald-400" />,
          badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        };
      case 'congestion':
      default:
        return {
          icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
          badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        };
    }
  };

  const details = getAlertDetails();

  return (
    <div className="w-72 bg-[#111723] border border-slate-800 rounded-xl p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.7)] text-slate-200">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0">
            {details.icon}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white leading-snug">{alert.title}</h3>
            <span className="text-[10px] text-slate-400">{alert.location}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${details.badgeClass}`}
        >
          {alert.severity} Impact
        </span>
        {alert.delayMinutes > 0 && (
          <span className="text-[11px] font-mono text-rose-400 font-semibold">
            +{alert.delayMinutes} min slowdown
          </span>
        )}
      </div>

      <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
        {alert.description}
      </p>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span>{alert.updatedTime}</span>
        </div>

        <button
          onClick={() => {
            setUpvoted(true);
            if (onUpvote) onUpvote(alert.id);
          }}
          className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
            upvoted
              ? 'text-emerald-400 bg-emerald-500/10'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{alert.reportedByCount + (upvoted ? 1 : 0)} confirmed</span>
        </button>
      </div>
    </div>
  );
};
