"use client";

import { useEffect } from "react";

const AudioVoices = ({ currentTrack, audioRef, visibleItems }: any) => {
  useEffect(() => {
    audioRef.current.play();
  }, [visibleItems, currentTrack, audioRef]);

  return (
    <div>
      <audio src={currentTrack} ref={audioRef} />
    </div>
  );
};

export default AudioVoices;
