
export const getThumbnailUrl = (item: MediaItem) => {
  if (item.thumbnailUrl && (item.thumbnailUrl.startsWith('http') || item.thumbnailUrl.startsWith('/'))) {
    return item.thumbnailUrl;
  }
  
  if (item.type === 'video') {
    // YouTube thumbnail
    return `https://img.youtube.com/vi/${item.sourceUrl}/maxresdefault.jpg`;
  }
  
  if (item.thumbnailUrl) {
    // Fallback for old Drive IDs if any remain
    return `https://drive.google.com/uc?export=view&id=${item.thumbnailUrl}`;
  }

  // If no thumbnail but has sourceUrl that looks like a path/url
  if (item.sourceUrl && (item.sourceUrl.startsWith('http') || item.sourceUrl.startsWith('/'))) {
    return item.sourceUrl;
  }

  return '';
};

export const getDisplayUrl = (item: MediaItem) => {
  if (item.type === 'video') {
    // YouTube Embed URL
    return `https://www.youtube.com/embed/${item.sourceUrl}?autoplay=1&modestbranding=1&rel=0`;
  }

  // For images, prioritize thumbnailUrl as requested, fallback to sourceUrl
  const url = item.thumbnailUrl || item.sourceUrl;
  if (url.startsWith('http') || url.startsWith('/')) return url;
  
  // Fallback for old Drive IDs
  return `https://drive.google.com/uc?export=view&id=${url}`;
};
