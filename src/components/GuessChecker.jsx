import { ColorCircle } from "./ColorCircle";

export function GuessChecker({ id, combinationLength }) {
  const verifyPeg = Array.from({ length: combinationLength });

  const gray = "#808080"; // Default gray color

  return (
    <div
      id={id}
      className="w-[40%] h-[2em] flex gap-1 items-center justify-center"
    >
      {verifyPeg.map((_, index) => (
        <ColorCircle
          key={index}
          color={gray}
          size={14}
          isSelectable={false}
          id={`check-row-${index}`}
        />
      ))}
    </div>
  );
}
