import { CombinationCover } from "./CombinationCover.jsx";
import { ColorPicker } from "./ColorPicker.jsx";
import { MasterCombination } from "./MasterCombination.jsx";
import { GuessContainer } from "./GuessContainer.jsx";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Selector } from "./Selector.jsx";
import { MessageBox } from "./MessageBox.jsx";

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

  const [isVisible, setIsVisible] = useState(true);
  const [endGame, setEndGame] = useState("");

  const colors = useMemo(
    () => ["red", "green", "blue", "yellow", "purple", "gainsboro"],
    []
  );

  const generateRandomCombination = useCallback(() => {
    const randomColors = [];
    for (let i = 0; i < combinationLength; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      randomColors.push(colors[randomIndex]);
    }
    return randomColors;
  }, [combinationLength, colors]);

  useEffect(() => {
    setMasterCombination(generateRandomCombination());
  }, [generateRandomCombination]);

  const checkWin = useCallback(
    (blackPegs) => {
      if (blackPegs.every((peg) => peg === true)) {
        setIsVisible(false);
        setEndGame("win");
      } else if (rowIndex === 0 && guesses[0].every((g) => g !== null)) {
        setIsVisible(false);
        setEndGame("lose");
      }
    },
    [rowIndex, guesses]
  );

  const setPegs = useCallback(
    (currentGuess, row) => {
      const copyBlack = checkBlack.map((rowArray, idx) =>
        idx === row ? [...rowArray] : rowArray
      );
      const copyWhite = checkWhite.map((rowArray, idx) =>
        idx === row ? [...rowArray] : rowArray
      );
      const copyUsedPegs = Array(combinationLength).fill(false);
      const copyUsedCombination = Array(combinationLength).fill(false);

      for (let i = 0; i < combinationLength; i++) {
        if (currentGuess[i] === masterCombination[i]) {
          copyBlack[row][i] = true;
          copyUsedPegs[i] = true;
          copyUsedCombination[i] = true;
        } else {
          copyBlack[row][i] = false;
        }
      }

      for (let i = 0; i < combinationLength; i++) {
        if (copyUsedPegs[i]) continue;
        for (let j = 0; j < combinationLength; j++) {
          if (copyBlack[row][j] || copyUsedCombination[j] || copyUsedPegs[i])
            continue;
          if (currentGuess[i] === masterCombination[j]) {
            copyWhite[row][i] = true;
            copyUsedPegs[i] = true;
            copyUsedCombination[j] = true;
            break;
          } else {
            copyWhite[row][i] = false;
          }
        }
      }

      setCheckBlack(copyBlack);
      setCheckWhite(copyWhite);
      checkWin(copyBlack[row]);
    },
    [checkBlack, checkWhite, masterCombination, combinationLength, checkWin]
  );

  const handleColorPick = useCallback(
    (color) => {
      if (guesses[0][combinationLength - 1] !== null) {
        setEndGame("lose");
        setIsVisible(false);
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
    },
    [colorIndex, combinationLength, guesses, rowIndex]
  );

  const reset = useCallback(() => {
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

    setEndGame("");
  }, [combinationLength, maxAttempts, generateRandomCombination]);

  return (
    <>
      <div className="w-[40%] flex justify-center absolute top-5 z-5 ">
        <MessageBox endGame={endGame} />
      </div>
      <div className="w-[80vw] mt-5 bg-red-900 min-h-[3em] my-glow py-8 overflow-hidden relative rounded-3xl ">
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
    </>
  );
}
