import { ColorCircle } from "./ColorCircle";
export function MasterCombination({ masterCombination }) {
  return (
    <div className="rounded-tr-3xl rounded-tl-3xl mb-2  bg-red-900  w-[100%]  flex items-center  h-[2em] justify-evenly text-xl md:text-5xl">
      {masterCombination.map((color, index) => (
        <ColorCircle key={index} color={color} isSelectable={false} />
      ))}
    </div>
  );
}
