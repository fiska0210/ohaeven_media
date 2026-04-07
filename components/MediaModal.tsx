import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag, Share2, Play } from 'lucide-react';
import { MediaItem } from '../types';
import { getThumbnailUrl, getDisplayUrl } from '../lib/mediaUtils';

interface MediaModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [item]);

  if (!item) return null;

  const displayUrl = getDisplayUrl(item);
  const thumbUrl = getThumbnailUrl(item);

  // 彈窗內的比例計算
  const modalAspectClass = item.aspectRatio === 'horizontal' 
    ? 'aspect-[16/9]' 
    : item.aspectRatio === 'square'
    ? 'aspect-square'
    : 'aspect-[9/16]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
        
        <div className="flex-[3] bg-zinc-950 flex items-center justify-center relative group overflow-hidden">
          <a 
            href={item.type === 'video' ? `https://www.youtube.com/shorts/${item.sourceUrl}` : item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-6 top-6 z-20 p-2.5 rounded-lg bg-black/60 text-white/70 hover:text-white hover:bg-black transition-all border border-white/10"
          >
            <Share2 size={18} />
          </a>

          {item.type === 'video' ? (
            <div className="w-full h-full flex items-center justify-center bg-black relative">
              {isPlaying ? (
                <iframe 
                  src={displayUrl} 
                  className={`w-full ${modalAspectClass} max-h-full border-0`}
                  allow="autoplay; fullscreen"
                  title={item.title}
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center cursor-pointer group/play" onClick={() => setIsPlaying(true)}>
                  <img 
                    src={thumbUrl} 
                    alt={item.title}
                    className="h-full w-full object-contain p-2 opacity-60 group-hover/play:opacity-80 transition-opacity"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (item.type === 'video' && !target.src.includes('mqdefault')) {
                        target.src = `https://img.youtube.com/vi/${item.sourceUrl}/mqdefault.jpg`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover/play:scale-110 transition-transform duration-500">
                      <Play size={40} className="text-white ml-2" fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img 
              src={thumbUrl} 
              alt={item.title}
              className="h-full w-full object-contain p-2"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (item.type === 'image' && !target.src.includes('unsplash')) {
                    target.src = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800';
                }
              }}
            />
          )}

          <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded bg-zinc-800/80 border border-white/10 text-[10px] font-bold text-zinc-400">
             VIVID GALLERY
          </div>
        </div>

        <div className="flex-1 flex flex-col p-8 bg-[#0a0a0a] border-l border-white/5 md:max-w-[380px] overflow-y-auto">
          <div className="flex justify-end mb-6">
            <button 
              onClick={onClose} 
              className="text-zinc-500 hover:text-white p-1 hover:bg-white/5 rounded-md transition-all"
            >
              <X size={22} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 leading-tight tracking-tight">
            {item.title}
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-400 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
              <Calendar size={14} className="text-blue-500/80" />
              {item.date}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-400 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
              <Tag size={14} className="text-purple-500/80" />
              {item.category}
            </div>
          </div>

          <div className="space-y-8 flex-1">
            <div className="space-y-3">
              <span className="block text-[10px] font-bold uppercase tracking-[2px] text-zinc-600">描述</span>
              <p className="text-[14px] text-zinc-400 leading-relaxed font-light whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
