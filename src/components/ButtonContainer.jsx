import { ResetButton } from "./ResetButton";

export function ButtonContainer({ reset }) {
  return (
    <div className="mt-5 flex justify-evenly items-evenly  absolute bottom-2 w-[100%] h-[30%]">
      <ResetButton reset={reset} />
    </div>
  );
}
