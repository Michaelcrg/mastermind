import { CombinationCover } from "./CombinationCover.jsx";
import { ColorPicker } from "./ColorPicker.jsx";
import { MasterCombination } from "./MasterCombination.jsx";
import { GuessContainer } from "./GuessContainer.jsx";
import { useState } from "react";
export function Board({ combinationLength, maxAttempts }) {
  const [rowIndex, setRowIndex] = useState(maxAttempts - 1);
  const [colorIndex, setColorIndex] = useState(0);
  const [guesses, setGuesses] = useState(
    Array.from({ length: maxAttempts }, () =>
      Array(combinationLength).fill(null)
    )
  );

  const handleColorPick = (color) => {
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[rowIndex] = [...newGuesses[rowIndex]];
      newGuesses[rowIndex][colorIndex] = color;
      console.log("Updated guesses:", newGuesses);
      return newGuesses;
    });

    if (colorIndex === combinationLength - 1) {
      setRowIndex((prev) => Math.max(prev - 1, 0));
      setColorIndex(0);
    } else {
      setColorIndex((i) => i + 1);
    }
  };

  return (
    <div className="w-[80vw] bg-red-900 min-h-[3em] my-glow max-w-[500px] overflow-hidden relative rounded-3xl">
      <MasterCombination combinationLength={combinationLength} />
      <GuessContainer
        combinationLength={combinationLength}
        maxAttempts={maxAttempts}
        guesses={guesses} // <-- PASSA LO STATO QUI
      />

      <ColorPicker onPick={handleColorPick} />
    </div>
  );
}
