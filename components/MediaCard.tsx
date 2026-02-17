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

  return (
    <div 
      onClick={() => onClick(item)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-500 hover:translate-y-[-6px] hover:shadow-2xl hover:shadow-blue-500/20"
    >
      {/* 
        如何調整尺寸：
        1. 比例：修改下方 aspect-[4/3]。可選：aspect-video (16:9), aspect-square (1:1), aspect-[3/4] (直式)
        2. 圖片填充：object-cover 會填滿容器，object-contain 則會顯示完整圖片（可能留白）
      */}
      <div className="aspect-video-[4/3]s w-full overflow-hidden bg-zinc-800">
        <img 
          src={thumbUrl} 
          alt={item.title}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('thumbnail')) {
               target.src = `https://drive.google.com/thumbnail?id=${item.thumbnailUrl}&sz=w800`;
            } else {
               target.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=800';
            }
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">
          {item.type === 'video' ? <Play size={10} fill="currentColor" /> : <ImageIcon size={10} />}
          {item.category}
        </div>
        <h3 className="text-white text-base font-bold leading-tight line-clamp-1 group-hover:text-blue-200 transition-colors">
          {item.title}
        </h3>
        
        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-zinc-400">{item.date}</span>
          <div className="flex items-center gap-1 text-[10px] text-white font-bold">
             <Maximize2 size={12} />
             <span>OPEN</span>
          </div>
        </div>
      </div>
    </div>
  );
};