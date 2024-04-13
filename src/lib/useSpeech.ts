import { useMemo, useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);
  const [nextSentenceIndx, setNextSentenceIndx] = useState(0);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const loadSentance = () => {
    if (
      currentSentenceIdx < sentences.length &&
      currentSentenceIdx <= nextSentenceIndx
    ) {
      setCurrentSentenceIdx(nextSentenceIndx);
      speechEngine.load(sentences[nextSentenceIndx]);
      setNextSentenceIndx(nextSentenceIndx + 1);
    }
  };

  const play = () => {
    speechEngine.play();
  };
  const pause = () => {
    speechEngine.pause();
  };

  const onStateUpdateHandler = (state: PlayingState) => {
    setPlaybackState(state);
  };

  const onBoundaryHandler = (event: any) => {
    console.log(event);
    const { charIndex, charLength } = event;
    setCurrentWordRange([charIndex, charIndex + charLength - 1]);
  };

  const onEndHandler = (event: any) => {
    console.log(event);
  };

  const speechEngine = useMemo(
    () =>
      createSpeechEngine({
        onStateUpdate: onStateUpdateHandler,
        onBoundary: onBoundaryHandler,
        onEnd: onEndHandler,
      }),
    []
  );

  useMemo(() => {
    loadSentance();
  }, [sentences]);

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    loadSentance,
  };
};

export { useSpeech };
