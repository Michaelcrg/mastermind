import { ResetButton } from "./ResetButton";
import { StartButton } from "./StartButton";

export function ButtonContainer() {
  return (
    <div className="flex justify-evenly items-evenly  absolute bottom-2 w-[100%] h-[30%]">
      <StartButton />
      <ResetButton />
    </div>
  );
}
