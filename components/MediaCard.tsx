import React from 'react';
import { Play, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onClick }) => {
  const getThumbnailUrl = (id: string) => {
    if (!id) return '';
    if (id.startsWith('http')) return id;
    return `https://drive.google.com/uc?export=view&id=${id}`;
  };

  const thumbUrl = getThumbnailUrl(item.thumbnailUrl);

  // 根據比例選擇 Tailwind 類別
  const aspectClass = item.aspectRatio === 'horizontal' 
    ? 'aspect-[4/3]' 
    : item.aspectRatio === 'square'
    ? 'aspect-square'
    : 'aspect-[3/4]';

  return (
    <div 
      onClick={() => onClick(item)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${item.aspectRatio === 'horizontal' ? 'sm:col-span-2' : ''}`}
    >
      <div className={`${aspectClass} w-full overflow-hidden bg-zinc-800`}>
        <img 
          src={thumbUrl} 
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('thumbnail')) {
               target.src = `https://drive.google.com/thumbnail?id=${item.thumbnailUrl}&sz=w800`;
            } else {
               target.src = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800';
            }
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent p-4 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1.5 opacity-80">
          {item.type === 'video' ? <Play size={10} fill="currentColor" /> : <ImageIcon size={10} />}
          {item.category}
        </div>
        <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 group-hover:text-blue-100 transition-colors">
          {item.title}
        </h3>
        
        <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2.5">
          <span className="text-[10px] text-zinc-500 font-medium">{item.date}</span>
          <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold">
             <Maximize2 size={12} className="group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
      
      {item.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Play size={24} className="text-white ml-1" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};