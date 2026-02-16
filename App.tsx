
import React, { useState, useMemo } from 'react';
import { Search, Library, LayoutGrid, List, Camera } from 'lucide-react';
import { MediaItem } from './types';
import { MediaCard } from './components/MediaCard';
import { MediaModal } from './components/MediaModal';

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: '新宿的霓虹雨夜',
    description: '記錄下東京都最繁忙街頭在雨後的色彩倒影，技術與現代性的完美融合。',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600',
    sourceUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=2000',
    type: 'image',
    category: 'Urban',
    date: '2023年10月12日'
  },
  {
    id: '2',
    title: '瑞士阿爾卑斯航拍',
    description: '一段壯闊的空拍片段，捕捉了黃金時段下被白雪覆蓋的峰巒。',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    type: 'video',
    category: 'Nature',
    date: '2023年11月05日'
  },
  {
    id: '3',
    title: '紐約曼哈頓俯瞰',
    description: '從摩天大樓 88 層向下望去，這座城市永不眠息。',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=600',
    sourceUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000',
    type: 'image',
    category: 'Architecture',
    date: '2023年12月01日'
  },
  {
    id: '4',
    title: '峇里島巨浪',
    description: '近距離捕捉大浪破碎前的慢動作瞬間，展現大自然的磅礴力量。',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=600',
    sourceUrl: 'https://www.w3schools.com/html/movie.mp4',
    type: 'video',
    category: 'Nature',
    date: '2024年01月15日'
  },
  {
    id: '5',
    title: '賽博龐克之城',
    description: '首爾深夜巷弄中的霓虹燈牌，反映出獨特的城市美學。',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600',
    sourceUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000',
    type: 'image',
    category: 'Urban',
    date: '2024年02月20日'
  },
  {
    id: '6',
    title: '吳哥窟的印記',
    description: '在千年神廟的牆上，刻滿了時間留下的故事。',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=600',
    sourceUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=2000',
    type: 'image',
    category: 'History',
    date: '2024年03月10日'
  }
];

const CATEGORIES = ['All', 'Travel', 'Nature', 'Architecture', 'Urban', 'History'];

export default function App() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMedia = useMemo(() => {
    return media.filter(item => {
      const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery);
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [media, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 glass-effect border-b border-white/5 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
              <Library className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-white">VividMemory</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">時光存儲庫</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="搜尋回憶..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center">
            {/* Removed Add Media Button */}
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 opacity-50 px-4 border-l border-white/10 hidden sm:block">
              Static Gallery
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto mt-10 max-w-7xl px-6 pb-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-zinc-900/50 border border-white/5 p-1.5">
            <button 
              onClick={() => setViewMode('grid')}
              className={`rounded-lg p-2.5 transition-all ${viewMode === 'grid' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`rounded-lg p-2.5 transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className={`mt-12 grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredMedia.length > 0 ? (
            filteredMedia.map(item => (
              <MediaCard 
                key={item.id} 
                item={item} 
                onClick={setSelectedItem}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
              <div className="mb-6 rounded-3xl bg-zinc-900 p-8 border border-white/5">
                <Camera size={48} className="text-zinc-700" />
              </div>
              <h3 className="text-2xl font-bold text-white">找不到匹配的回憶</h3>
              <p className="mt-2 text-zinc-500 max-w-xs">嘗試更換關鍵字或選擇其他分類。</p>
            </div>
          )}
        </div>
      </main>

      <MediaModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      {/* Background Blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-blue-600 blur-[140px]" />
        <div className="absolute bottom-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-purple-600 blur-[130px]" />
      </div>
    </div>
  );
}
