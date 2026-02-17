
export type MediaType = 'image' | 'video';
export type AspectRatio = 'vertical' | 'horizontal' | 'square';

export interface MediaItem {
  id: string;
  thumbnailUrl: string;
  sourceUrl: string; 
  type: MediaType;
  title: string;
  description: string;
  category: string;
  date: string;
  aspectRatio?: AspectRatio;
}