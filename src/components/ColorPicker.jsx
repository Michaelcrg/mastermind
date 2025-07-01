import { ColorCircle } from "./ColorCircle";
import { ButtonContainer } from "./ButtonContainer";

export function ColorPicker({ onPick }) {
  return (
    <div className="absolute bottom-6 left-0 w-full h-[0.5px] py-5 flex items-center justify-evenly text-xl md:text-5xl">
      {["red", "blue", "green", "yellow", "purple", "orange"].map((color) => (
        <ColorCircle key={color} color={color} onClick={() => onPick(color)} />
      ))}
      <ButtonContainer />
    </div>
  );
}
