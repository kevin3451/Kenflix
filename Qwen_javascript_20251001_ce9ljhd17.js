import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ source, onProgress, onEnd }) => {
  const videoRef = useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: source }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        onProgress={({ currentTime, playableDuration }) => {
          if (playableDuration > 0) {
            const progress = (currentTime / playableDuration) * 100;
            onProgress(progress);
          }
        }}
        onEnd={onEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayer;