import { CombinationCover } from "./CombinationCover.jsx";
import { ColorPicker } from "./ColorPicker.jsx";
import { MasterCombination } from "./MasterCombination.jsx";
import { GuessContainer } from "./GuessContainer.jsx";
import { useState, useEffect, useCallback } from "react";
import { Selector } from "./Selector.jsx";

export function Board({
  combinationLength,
  maxAttempts,
  setCombinationLength,
  setMaxAttempts,
}) {
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

  const [usedPegs, setUsedPegs] = useState(
    Array(combinationLength).fill(false)
  );
  const [usedCombination, setUsedCombination] = useState(
    Array(combinationLength).fill(false)
  );

  const [isVisible, setIsVisible] = useState(true);

  const setPegs = useCallback(
    (currentGuess, rowIndex) => {
      setCheckWhite(Array(combinationLength).fill(false));
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
        if (copyPegs[i]) {
          continue;
        }

        for (let j = 0; j < combinationLength; j++) {
          if (copyBlack[rowIndex][j] || copyCombination[j]) continue;

          if (currentGuess[i] === masterCombination[j]) {
            copyWhite[rowIndex][i] = true;
            copyPegs[i] = true;
            copyCombination[j] = true;

            break;
          } else {
            copyWhite[rowIndex][i] = false;
          }
        }
      }

      setCheckWhite(copyWhite);
      setUsedPegs(Array(combinationLength).fill(null));
      setUsedCombination(Array(combinationLength).fill(null));
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

  const reset = () => {
    console.log("reset");

    setIsVisible(true);
    setMasterCombination(generateRandomCombination());
    setCheckBlack(
      Array(maxAttempts)
        .fill(null)
        .map(() => Array(combinationLength).fill(false))
    );
    setCheckWhite(
      Array(maxAttempts)
        .fill(null)
        .map(() => Array(combinationLength).fill(false))
    );

    setGuesses(
      Array(maxAttempts)
        .fill(null)
        .map(() => Array(combinationLength).fill(null))
    );
    setRowIndex(maxAttempts - 1);
    setColorIndex(0);
    setUsedPegs(Array(combinationLength).fill(null));
    setUsedCombination(Array(combinationLength).fill(null));
  };

  const checkWin = (blackPegs) => {
    if (blackPegs.every((peg) => peg === true)) {
      setIsVisible(false);
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

  const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

  const generateRandomCombination = () => {
    const randomColors = [];
    for (let i = 0; i < combinationLength; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      randomColors.push(colors[randomIndex]);
    }
    return randomColors;
  };

  useEffect(() => {
    setMasterCombination(generateRandomCombination());
  }, []);

  return (
    <div className="w-[80vw] bg-red-900 min-h-[3em] my-glow  py-8 overflow-hidden relative rounded-3xl">
      <Selector
        combinationLength={combinationLength}
        maxAttempts={maxAttempts}
        setCombinationLength={setCombinationLength}
        setMaxAttempts={setMaxAttempts}
        reset={reset}
      />
      <CombinationCover isVisible={isVisible} />
      <MasterCombination masterCombination={masterCombination} />
      <GuessContainer
        combinationLength={combinationLength}
        maxAttempts={maxAttempts}
        guesses={guesses}
        setPegs={setPegs}
        checkBlack={checkBlack}
        checkWhite={checkWhite}
      />

      <ColorPicker reset={reset} onPick={handleColorPick} />
    </div>
  );
}
