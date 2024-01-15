import React, { useState, useCallback, useEffect } from "react";
import SoundSquare from "./SoundSquare"; // Make sure the path is correct

const soundFolder = "/sounds";
const sound1 = `${soundFolder}/1.mp3`;
const localStorageKey = "savedSounds";

function SoundGrid() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [soundSquareArr, setSoundSquareArr] = useState([]);

  const playAudio = useCallback((audioId) => {
    setCurrentlyPlaying(audioId);
  }, []);
  console.log(JSON.parse(localStorage.getItem(localStorageKey)).length);
  useEffect(() => {
    const savedSounds =
      JSON.parse(localStorage.getItem(localStorageKey)).length > 0
        ? JSON.parse(localStorage.getItem(localStorageKey))
        : [
            {
              text: "President",
              sound: sound1,
              id: "sound1",
              key: "sound1",
            },
          ];
    setSoundSquareArr(savedSounds);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSound = {
          text: file.name,
          sound: e.target.result,
          id: `sound${soundSquareArr.length + 1}`,
          key: `sound${soundSquareArr.length + 1}`,
        };
        const newSounds = [...soundSquareArr, newSound];
        setSoundSquareArr(newSounds);
        localStorage.setItem(localStorageKey, JSON.stringify(newSounds));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteSound = (id) => {
    const updatedSounds = soundSquareArr.filter((sound) => sound.id !== id);
    setSoundSquareArr(updatedSounds);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedSounds));
  };

  return (
    <div className="drop-zone" onDragOver={handleDragOver} onDrop={handleDrop}>
      Drag and drop an audio file here
      <div className="square-container">
        <div className="grid grid-column-8">
          {soundSquareArr.map((sound) => (
            <SoundSquare
              key={sound.id}
              text={sound.text}
              sound={sound.sound}
              audioPlaying={currentlyPlaying}
              id={sound.id}
              playAudio={playAudio}
              deleteSound={deleteSound}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SoundGrid;
