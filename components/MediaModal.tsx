import React from 'react';
import { X, Calendar, Tag, Share2 } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const getDisplayUrl = (sourceId: string, type: 'image' | 'video') => {
    if (sourceId.startsWith('http')) return sourceId;
    if (type === 'video') {
      return `https://drive.google.com/file/d/${sourceId}/preview`;
    }
    return `https://drive.google.com/uc?export=view&id=${sourceId}`;
  };

  const displayUrl = getDisplayUrl(item.sourceUrl, item.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
        
        {/* 左側媒體區域 */}
        <div className="flex-[3] bg-zinc-950 flex items-center justify-center relative group overflow-hidden">
          <a 
            href={`https://drive.google.com/file/d/${item.sourceUrl}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-6 top-6 z-20 p-2.5 rounded-lg bg-black/60 text-white/70 hover:text-white hover:bg-black transition-all border border-white/10"
          >
            <Share2 size={18} />
          </a>

          {item.type === 'video' ? (
            <div className="w-full h-full flex items-center justify-center bg-black">
              <iframe 
                src={displayUrl} 
                className="w-full aspect-[9/16] max-h-full border-0"
                allow="autoplay; fullscreen"
                title={item.title}
              />
            </div>
          ) : (
            <img 
              src={displayUrl} 
              alt={item.title}
              className="h-full w-full object-contain p-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('thumbnail')) {
                    target.src = `https://drive.google.com/thumbnail?id=${item.sourceUrl}&sz=w2000`;
                }
              }}
            />
          )}

          <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded bg-zinc-800/80 border border-white/10 text-[10px] font-bold text-zinc-400">
             VIVID GALLERY
          </div>
        </div>

        {/* 右側資訊欄 */}
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
              {/* <span className="block text-[10px] font-bold uppercase tracking-[2px] text-zinc-600">描述</span> */}
              {/* 加入 whitespace-pre-wrap 類別 */}
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