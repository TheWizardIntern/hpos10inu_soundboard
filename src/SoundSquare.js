import React, { useRef, useState, useEffect } from "react";

function SoundSquare({
  text,
  sound,
  audioPlaying,
  id,
  playAudio,
  deleteSound,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayStop = () => {
    const audio = audioRef.current;
    if (audioPlaying !== id) {
      playAudio(id);
      audio.play();
      setIsPlaying(true);
    } else if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      playAudio(null);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnd = () => {
      setIsPlaying(false);
      playAudio(null);
    };

    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [playAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audioPlaying !== id && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audioPlaying, id]);

  const handleDelete = () => {
    deleteSound(id);
  };

  const squareClass = isPlaying ? "grid-square playing" : "grid-square";

  return (
    <div className={squareClass}>
      <div onClick={togglePlayStop}>
        {text || "Play Sound"}
        <audio ref={audioRef}>
          <source src={sound} type="audio/mpeg" />
        </audio>
      </div>
      <button onClick={handleDelete} className="delete-button">
        &times;
      </button>
    </div>
  );
}

export default SoundSquare;
