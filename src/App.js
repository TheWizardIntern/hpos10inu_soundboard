import { useRef, useState, useEffect } from "react";

const sounds = [
  {
    text: "Who Could Have Done Something Like That?",
    sound: "/sounds/president.ogg",
  },
  { text: "I Know My Horse", sound: "/sounds/horse.ogg" },
  { text: "I Already Did", sound: "/sounds/i already did.ogg" },
  { text: "Rocky Theme", sound: "/sounds/rocky.ogg" },
  { text: "Wordy Little Bastard", sound: "/sounds/wordy bastard.ogg" },
];

export default function App() {
  return (
    <div>
      <div className="main">
        <SoundGrid />
      </div>
    </div>
  );
}

function SoundGrid() {
  const [currentPlaying, setCurrentPlaying] = useState(null);

  const playAudio = (soundId) => {
    if (currentPlaying === soundId) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(soundId);
    }
  };

  return (
    <div className="square-container">
      <div className="grid grid-column-3">
        {sounds.map(({ text, sound }) => (
          <SoundSquare
            key={sound}
            text={text}
            sound={sound}
            isPlaying={currentPlaying === sound}
            onPlay={() => playAudio(sound)}
          />
        ))}
      </div>
    </div>
  );
}

function SoundSquare({ text, sound, isPlaying, onPlay }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayStop = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      onPlay();
    } else {
      audio.play();
      onPlay();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnd = () => {
      audio.currentTime = 0;
      onPlay();
    };

    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [onPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    let intervalId;

    if (isPlaying) {
      audio.play();
      setCurrentTime(audio.duration - audio.currentTime);

      intervalId = setInterval(() => {
        setCurrentTime(audio.duration - audio.currentTime);
      }, 1000);
    } else {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  const squareClass = `grid-square ${isPlaying ? "playing" : ""}`;

  const getFontSize = (title) => {
    return `${65 - title.length * 0.9}px`;
  };

  const squareStyle = {
    fontSize: getFontSize(text),
  };

  return (
    <div className={squareClass} onClick={togglePlayStop} style={squareStyle}>
      {text || "Play Sound"}
      <audio ref={audioRef} preload="metadata">
        <source src={sound} type="audio/mpeg" />
      </audio>
      <div className="timer">{isPlaying && Math.floor(currentTime)}</div>
    </div>
  );
}
