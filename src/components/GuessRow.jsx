import { ColorCircle } from "./ColorCircle";

export function GuessRow({ id, combinationLength, colors }) {
  const colorsToShow = colors ?? Array(combinationLength).fill(null);

  return (
    <div
      id={id}
      className="w-[60%] -yellow-500 h-[2em] flex gap-1 items-center justify-center"
    >
      {colorsToShow.map((color, index) => (
        <ColorCircle
          key={index}
          color={color || "#000000"}
          id={`guess-row-${index}`}
        />
      ))}
    </div>
  );
}
