import { GuessChecker } from "./GuessChecker";
import { GuessRow } from "./GuessRow";

export function GuessContainer({
  combinationLength,
  guesses,
  setPegs,
  checkBlack,
  checkWhite,
}) {
  return (
    <div className="min-h-[2em] flex flex-col mt-15 mb-15 px-5  ">
      {guesses.map((rowColors, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-center gap-x-3"
        >
          <GuessChecker
            id={`checker-${index}`}
            attemptIndex={index}
            combinationLength={combinationLength}
            setPegsHandler={() => setPegs(guesses[index], index)}
            checkBlack={
              checkBlack[index] ?? Array(combinationLength).fill(false)
            }
            checkWhite={
              checkWhite[index] ?? Array(combinationLength).fill(false)
            }
          />

          <GuessRow
            id={`row-${index}`}
            attemptIndex={index}
            combinationLength={combinationLength}
            colors={rowColors ?? Array(combinationLength).fill(null)}
            setPegs={() => setPegs(guesses[index], index)}
            checkBlack={
              checkBlack[index] ?? Array(combinationLength).fill(false)
            }
            checkWhite={
              checkWhite[index] ?? Array(combinationLength).fill(false)
            }
          />
        </div>
      ))}
    </div>
  );
}
