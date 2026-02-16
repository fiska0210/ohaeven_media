
import React from 'react';
import { Play, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img 
          src={item.thumbnailUrl} 
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-blue-400">
          {item.type === 'video' ? <Play size={12} fill="currentColor" /> : <ImageIcon size={12} />}
          {item.category}
        </div>
        <h3 className="mt-1 text-lg font-bold text-white line-clamp-1">{item.title}</h3>
        <p className="mt-1 text-sm text-zinc-300 line-clamp-2">{item.description}</p>
        
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-xs text-zinc-500">{item.date}</span>
          <Maximize2 size={16} className="text-zinc-400" />
        </div>
      </div>

      {/* Type Indicator (Static) */}
      <div className="absolute right-3 top-3 rounded-full bg-black/40 p-2 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-0">
        {item.type === 'video' ? <Play size={14} className="text-white" /> : <ImageIcon size={14} className="text-white" />}
      </div>
    </div>
  );
};
