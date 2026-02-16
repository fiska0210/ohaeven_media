import React, { useState, useMemo } from 'react';
import { Search, Library, LayoutGrid, List, Camera } from 'lucide-react';
import { MediaItem } from './types';
import { MediaCard } from './components/MediaCard';
import { MediaModal } from './components/MediaModal';

// 初始資料：請將 id 替換為您 Google Drive 的檔案 ID
// thumbnailUrl 與 sourceUrl 現在都建議直接放入 Drive ID
// https://drive.google.com/file/d/1Vm2PDm1m8J9T42FS27m8zXO5fwjDgjSZ/view?usp=drive_link
// https://drive.google.com/file/d/1h9DFgvIHpfgWdBSN7j7cWsOw1W81u3L2/view?usp=drive_link

/**
 * 重要說明：
 * 1. Google Drive 檔案必須設定為「知道連結的人皆可查看」。
 * 2. 獲取 ID 的方法：分享連結中 d/ 之後、/view 之前的字串。
 *    例如：https://drive.google.com/file/d/1ABCDE.../view -> ID 就是 1ABCDE...
 */

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: '2026 NMIXX 1st World Tour Day2',
    description: '我會成為不愧於大家，無論到哪都想要炫耀的歌手。所以無論在近處還是遠遠的，請繼續關注著我！',
    thumbnailUrl: '1Vm2PDm1m8J9T42FS27m8zXO5fwjDgjSZ', // 替換成您的圖片 ID
    sourceUrl: '1h9DFgvIHpfgWdBSN7j7cWsOw1W81u3L2',    // 替換成您的圖片 ID
    type: 'video',
    category: 'Photocard',
    date: '2025/11/30'
  },
  {
    id: '2',
    title: 'NMIXX의 그림일기📒 Ep.1',
    description: 'Austin......',
    thumbnailUrl: '1amhe4lCzmb2u3u8QYGUpu0ikmtF9fjhA', // 建議使用圖片 ID 作為影片封面
    sourceUrl: '192hcwzQhI4QnnaQv39kBscl1PCZClPq6',    // 替換成您的影片 ID
    type: 'video', // image
    category: 'Photocard',
    date: '2024/06/20'
  }
];

const CATEGORIES = ['All', 'Travel', 'Nature', 'Architecture', 'Urban'];

export default function App() {
  const [media] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMedia = useMemo(() => {
    return media.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [media, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 glass-effect border-b border-white/5 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600">
              <Library className="text-white" size={20} />
            </div>
            <h1 className="text-lg font-bold text-white hidden sm:block">VividMemory</h1>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="搜尋內容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto mt-8 max-w-[1600px] px-6 pb-20">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 
          調整欄數來改變卡片大小：
          - 原本: lg:grid-cols-3
          - 現在: lg:grid-cols-4 (卡片變小)
          - 若要大卡片可改為: md:grid-cols-2
        */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredMedia.map(item => (
            <MediaCard key={item.id} item={item} onClick={setSelectedItem} />
          ))}
        </div>
      </main>

      <MediaModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}