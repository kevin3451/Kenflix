import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src, onProgress, onEnded }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: src,
          type: 'video/mp4'
        }]
      });

      player.on('timeupdate', () => {
        const progress = (player.currentTime() / player.duration()) * 100;
        onProgress(progress);
      });

      player.on('ended', onEnded);

      playerRef.current = player;
    } else {
      const player = playerRef.current;
      player.src({ src, type: 'video/mp4' });
    }
  }, [src]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;