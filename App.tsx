import React, { useState, useMemo } from 'react';
import { Search, Library, LayoutGrid, List, Camera } from 'lucide-react';
import { MediaItem } from './types';
import { MediaCard } from './components/MediaCard';
import { MediaModal } from './components/MediaModal';

// thumbnailUrl 與 sourceUrl 現在都建議直接放入 Drive ID

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: '2026 NMIXX 1st World Tour Day2',
    description: ' "여러분들에게 안 부끄럽고\n 어딜가나 자랑하고 싶은\n 그런 가수가 되겠습니다\n 가까이서든 멀리서든\n 지켜봐 주세요!" \n\n「我會成為不愧於大家，\n無論到哪都想要炫耀的歌手。\n所以無論在近處還是遠遠的，\n請繼續關注著我！」',
    thumbnailUrl: '/assets/ver_A.png',
    sourceUrl: 'hiCgIuMYAwo',
    type: 'video',
    category: 'Photocard',
    date: '2025/11/30',
    aspectRatio: 'horizontal'
  },
  {
    id: '2',
    title: 'NMIXX의 그림일기📒 Ep.1',
    description: ' "아, 그럼 엔써아\n 내 어떤 모습이...\n 엔써들를 끌어당겼어?" \n By 오해원(X) 오스턴! \n\n 「呀 所以NSWER啊 \n 我的什麼樣的魅力... \n 讓NSWER著迷呢？ \n By 吳海嫄(X) Austin!」',
    thumbnailUrl: '/assets/ver_B.png',
    sourceUrl: 'ZaxoIO-FDM0',
    type: 'video', // image
    category: 'Photocard',
    date: '',
    aspectRatio: 'horizontal'
  },
  {
    id: '3',
    title: 'MARIE CLAIRE Korea June 2025',
    description: '「為什麼在有限的生命中還要執著於忌妒和貪心呢。\n 不如在這段時間裡相愛吧。 \n 就那樣唱著歌、跳舞吧。\n\n 希望能夠放下猜忌、忌妒，沒有煩惱的去愛 \n 我夢想著那樣的世界」',
    thumbnailUrl: '1EMnFmiZE-mR6RV9ey9NnwVxzEKONNzWK',
    sourceUrl: '1eVoxUljZYtWVbOrkvBHkDh2CqsWYpP6O',
    type: 'image',
    category: 'Photocard',
    date: '2025/06/06',
    aspectRatio: 'horizontal' // vertical
  },
  {
    id: '',
    title: 'Exhibition Pamphlet',
    description: 'More detial for the exhibition...',
    thumbnailUrl: '1oigC8kH6vACs85zjvTCXCXVRwz7IJNrl',
    sourceUrl: '1OIEGyw4DFOnfcuC9Ql8wKhKpT80ykfS6',
    type: 'image',
    category: 'Others',
    date: '',
    aspectRatio: 'vertical'
  }
];

const CATEGORIES = ['All', 'Photocard', 'Stage', 'Pictorial', 'Variety Shows', 'Others'];

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
            <h1 className="text-lg font-bold text-white hidden sm:block tracking-tight">O'HAEVEN</h1>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="搜尋收藏..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-inner' : 'text-zinc-500 hover:text-white'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-inner' : 'text-zinc-500 hover:text-white'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto mt-10 max-w-[1600px] px-6 pb-20">
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeCategory === cat 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' 
                  : 'bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800 hover:text-white border border-white/5'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredMedia.map(item => (
            <MediaCard key={item.id} item={item} onClick={setSelectedItem} />
          ))}
        </div>
        
        {filteredMedia.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 opacity-20">
            <Library size={64} className="mb-4" />
            <p className="text-xl font-medium">沒有找到相關內容</p>
          </div>
        )}
      </main>

      <MediaModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}