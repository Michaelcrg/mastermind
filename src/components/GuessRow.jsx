import { ColorCircle } from "./ColorCircle";
import { useEffect, useMemo } from "react";
export function GuessRow({ id, combinationLength, colors, setPegs }) {
  const colorsToShow = useMemo(
    () =>
      !colors || colors.length !== combinationLength
        ? Array(combinationLength).fill(null)
        : colors,
    [colors, combinationLength]
  );

  useEffect(() => {
    const lastIndex = combinationLength - 1;
    if (colorsToShow[lastIndex] != null) {
      setPegs();
    }
  }, [colorsToShow, combinationLength, setPegs]);

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
