import { useState, useEffect } from "react";
import { ColorCircle } from "./ColorCircle";
export function MasterCombination({ combinationLength }) {
  const [masterCombination, setMasterCombination] = useState([]);

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
    <div className="rounded-tr-3xl rounded-tl-3xl  bg-red-900  w-[100%]  flex items-center  h-[2em] justify-evenly text-xl md:text-5xl">
      {masterCombination.map((color, index) => (
        <ColorCircle key={index} color={color} isSelectable={false} />
      ))}
    </div>
  );
}
