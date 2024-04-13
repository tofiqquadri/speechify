/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  console.log(
    currentWordRange,
    currentSentenceIdx,
    sentences,
    sentences[currentSentenceIdx]?.slice(
      currentWordRange[1] + 1,
      sentences[currentSentenceIdx].length
    )
  );

  const highlightedWord =
    sentences.length > 0
      ? sentences[currentSentenceIdx]?.slice(
          currentWordRange[0],
          currentWordRange[1] + 1
        )
      : "";

  const startingWords =
    sentences.length > 0
      ? sentences[currentSentenceIdx]?.slice(0, currentWordRange[0])
      : "";

  const endingWords =
    sentences.length > 0
      ? sentences[currentSentenceIdx]?.slice(
          currentWordRange[1] + 1,
          sentences[currentSentenceIdx].length
        )
      : "";

  return (
    <div data-testid="currently-reading" className="currently-reading">
      <p id="currently-reading-text" className="currently-reading-text">
        {startingWords}
        <span id="current-word" className="currentword">
          {highlightedWord}
        </span>
        {endingWords}
      </p>
      <p>{sentences.join(" ")}</p>
    </div>
  );
};
