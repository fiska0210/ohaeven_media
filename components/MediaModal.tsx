import React from 'react';
import { X, Calendar, Tag, ExternalLink } from 'lucide-react';
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
    // 使用 uc?export=view 取得圖片
    return `https://drive.google.com/uc?export=view&id=${sourceId}`;
  };

  const displayUrl = getDisplayUrl(item.sourceUrl, item.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass-effect flex h-full max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl md:flex-row shadow-2xl border-white/10">
        
        <div className="flex-[3] bg-zinc-950 flex items-center justify-center relative">
          {item.type === 'video' ? (
            <iframe 
              src={displayUrl} 
              className="h-full w-full border-0"
              allow="autoplay; fullscreen"
              title={item.title}
            />
          ) : (
            <img 
              src={displayUrl} 
              alt={item.title}
              className="h-full w-full object-contain p-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('thumbnail')) {
                    target.src = `https://drive.google.com/thumbnail?id=${item.sourceUrl}&sz=w2000`;
                }
              }}
            />
          )}
          
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/50 text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6 bg-zinc-900/50 md:max-w-[350px] overflow-y-auto">
          <div className="hidden md:flex justify-end mb-4">
            <button onClick={onClose} className="text-zinc-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              <Calendar size={12} className="text-blue-500" />
              {item.date}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              <Tag size={12} className="text-purple-500" />
              {item.category}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2">描述</span>
              <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
            </div>

            <a 
              href={`https://drive.google.com/file/d/${item.sourceUrl}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={14} />
              在 Google Drive 中檢視原檔
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};