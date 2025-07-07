import { CombinationCover } from "./CombinationCover.jsx";
import { ColorPicker } from "./ColorPicker.jsx";
import { MasterCombination } from "./MasterCombination.jsx";
import { GuessContainer } from "./GuessContainer.jsx";
import { useState, useEffect, useCallback } from "react";
import { GuessChecker } from "./GuessChecker.jsx";

export function Board({ combinationLength, maxAttempts }) {
  const [rowIndex, setRowIndex] = useState(maxAttempts - 1);
  const [colorIndex, setColorIndex] = useState(0);
  const [guesses, setGuesses] = useState(
    Array.from({ length: maxAttempts }, () =>
      Array(combinationLength).fill(null)
    )
  );
  const [masterCombination, setMasterCombination] = useState([]);

  const [checkBlack, setCheckBlack] = useState(
    Array(maxAttempts)
      .fill(null)
      .map(() => Array(combinationLength).fill(false))
  );

  const [checkWhite, setCheckWhite] = useState(
    Array(maxAttempts)
      .fill(null)
      .map(() => Array(combinationLength).fill(false))
  );

  const [usedPegs, setUsedPegs] = useState(Array(combinationLength).fill(null));
  const [usedCombination, setUsedCombination] = useState(
    Array(combinationLength).fill(null)
  );

  const setPegs = useCallback(
    (currentGuess, rowIndex) => {
      const copyBlack = checkBlack.map((row, idx) =>
        idx === rowIndex ? [...row] : row
      );
      const copyWhite = checkWhite.map((row, idx) =>
        idx === rowIndex ? [...row] : row
      );

      const copyPegs = [...usedPegs];
      const copyCombination = [...usedCombination];

      for (let i = 0; i < combinationLength; i++) {
        if (currentGuess[i] === masterCombination[i]) {
          copyBlack[rowIndex][i] = true;
          copyPegs[i] = true;
          copyCombination[i] = true;
        }
      }

      setCheckBlack(copyBlack);
      setUsedCombination(copyCombination);
      setUsedPegs(copyPegs);
      checkWin(copyBlack[rowIndex]);

      for (let i = 0; i < combinationLength; i++) {
        if (copyPegs[i]) continue;

        for (let j = 0; j < combinationLength; j++) {
          if (copyCombination[j]) continue;

          if (currentGuess[i] === masterCombination[j]) {
            copyWhite[rowIndex][i] = true;

            copyCombination[i] = true;
            break;
          }
        }
      }

      setCheckWhite(copyWhite);
      setUsedPegs(copyPegs);
      setUsedCombination(copyCombination);
      checkWin(copyBlack[rowIndex]);
    },
    [
      checkBlack,
      checkWhite,
      usedPegs,
      usedCombination,
      masterCombination,
      combinationLength,
    ]
  );

  const checkWin = (blackPegs) => {
    if (blackPegs.every((peg) => peg === true)) {
      alert("victory");
    }
  };

  const handleColorPick = (color) => {
    if (guesses[0][combinationLength - 1] != null) {
      alert("Too much attempts! Press reset to start over.");
      return;
    }

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[rowIndex] = [...newGuesses[rowIndex]];
      newGuesses[rowIndex][colorIndex] = color;

      return newGuesses;
    });

    if (colorIndex === combinationLength - 1) {
      setRowIndex((prev) => Math.max(prev - 1, 0));
      setColorIndex(0);
    } else {
      setColorIndex((i) => i + 1);
    }
  };

  useEffect(() => {
    const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
    const randomCombination = () => {
      const randomColors = [];

      for (let i = 0; i < combinationLength; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        randomColors.push(colors[randomIndex]);
      }
      setMasterCombination(randomColors);
    };

    randomCombination();
  }, [combinationLength]);

  return (
    <div className="w-[80vw] bg-red-900 min-h-[3em] my-glow max-w-[500px] overflow-hidden relative rounded-3xl">
      <CombinationCover />
      <MasterCombination masterCombination={masterCombination} />
      <GuessContainer
        combinationLength={combinationLength}
        maxAttempts={maxAttempts}
        guesses={guesses}
        setPegs={setPegs}
        checkBlack={checkBlack}
        checkWhite={checkWhite}
      />

      <ColorPicker onPick={handleColorPick} />
    </div>
  );
}
