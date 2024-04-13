import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWordRange, currentSentenceIdx, play, pause, playbackState, loadSentance } =
    useSpeech(sentences);

  useEffect(() => {
    fetchContent().then((response: any) => {
      const parsedsentances = parseContentIntoSentences(
        response?.content || ""
      );
      if (parsedsentances && parsedsentances.length > 0) {
        setSentences(parsedsentances);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentWordRange={currentWordRange}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls play={play} pause={pause} loadNewContent={loadSentance} state={playbackState} />
      </div>
    </div>
  );
}

export default App;
