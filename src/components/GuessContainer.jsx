import { GuessChecker } from "./GuessChecker";
import { GuessRow } from "./GuessRow";

export function GuessContainer({ combinationLength, guesses }) {
  return (
    <div className="min-h-[2em] flex flex-col mb-15">
      {guesses.map((rowColors, index) => (
        <div key={index} className="flex flex-row items-center">
          <GuessChecker
            id={`checker-${index}`}
            attemptIndex={index}
            combinationLength={combinationLength}
          />
          <GuessRow
            id={`row-${index}`}
            attemptIndex={index}
            combinationLength={combinationLength}
            colors={rowColors ?? Array(combinationLength).fill(null)}
          />
        </div>
      ))}
    </div>
  );
}
