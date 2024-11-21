import React from "react";

function VideoList({ videos, onVideoClick }) {
  return (
    <div className="body">
      <div id="video-list" className="video-list">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="video-card"
            onClick={() => onVideoClick(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
