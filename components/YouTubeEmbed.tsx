import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  title = "YouTube video", 
  className = "" 
}) => {
  return (
    <iframe 
      width="560" 
      height="315" 
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      style={{ border: 0 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen
      className={className}
      loading="lazy"
    />
  );
};

export default YouTubeEmbed; 