import { ColorCircle } from "./ColorCircle";
import { ButtonContainer } from "./ButtonContainer";

export function ColorPicker({ onPick, reset }) {
  return (
    <div className="absolute bottom-6 left-0 w-full h-[0.5px] mb-8 flex items-center justify-evenly text-xl md:text-5xl">
      {["red", "blue", "green", "yellow", "purple", "gainsboro"].map(
        (color) => (
          <ColorCircle
            size={45}
            key={color}
            color={color}
            onClick={() => onPick(color)}
          />
        )
      )}
      <ButtonContainer reset={reset} />
    </div>
  );
}
