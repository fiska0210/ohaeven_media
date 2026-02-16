
export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  thumbnailUrl: string;
  sourceUrl: string; // The high quality image or video to show in modal
  type: MediaType;
  title: string;
  description: string;
  category: string;
  date: string;
}
