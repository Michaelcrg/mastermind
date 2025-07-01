import { ColorCircle } from "./ColorCircle";

export function GuessChecker({
  id,
  combinationLength,
  setPegs,
  checkBlack,
  checkWhite,
}) {
  const verifyPeg = Array.from({ length: combinationLength });

  return (
    <div
      id={id}
      onClick={setPegs}
      className="w-[40%] h-[2em] flex gap-1 items-center justify-center"
    >
      {verifyPeg.map((_, index) => (
        <ColorCircle
          key={index}
          color={
            checkBlack[index] ? "black" : checkWhite[index] ? "white" : "gray"
          }
          size={14}
          isSelectable={false}
          id={`check-row-${index}`}
        />
      ))}
    </div>
  );
}
