
import React from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative glass-effect flex h-full max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl md:flex-row shadow-2xl border-white/20">
        
        {/* Media Player Side */}
        <div className="flex flex-[1.5] items-center justify-center bg-zinc-950 relative group">
          {item.type === 'video' ? (
            <video 
              src={item.sourceUrl} 
              className="h-full w-full object-contain"
              controls
              autoPlay
              loop
            />
          ) : (
            <img 
              src={item.sourceUrl} 
              alt={item.title}
              className="h-full w-full object-contain p-4"
            />
          )}
          
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl hover:bg-white/10 transition-all md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Info Sidebar */}
        <div className="flex w-full flex-col border-l border-white/5 p-8 md:w-[420px] bg-black/20">
          <div className="hidden items-center justify-between md:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">Media Details</span>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mt-8 flex-1 overflow-y-auto pr-2">
            <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">{item.title}</h2>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Calendar size={14} className="text-blue-500" />
                {item.date}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Tag size={14} className="text-purple-500" />
                {item.category}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Description</h4>
                <p className="text-zinc-300 leading-relaxed text-sm font-light">
                  {item.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons removed */}
        </div>
      </div>
    </div>
  );
};
