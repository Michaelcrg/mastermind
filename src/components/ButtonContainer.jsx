import { ResetButton } from "./ResetButton";
import { StartButton } from "./StartButton";

export function ButtonContainer() {
  return (
    <div className="mt-5 flex justify-evenly items-evenly  absolute bottom-2 w-[100%] h-[30%]">
      <StartButton />
      <ResetButton />
    </div>
  );
}
