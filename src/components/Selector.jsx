import { useState, useEffect } from "react";

export function Selector({
  combinationLength,
  maxAttempts,
  setCombinationLength,
  setMaxAttempts,
  reset,
}) {
  const [lengthInput, setLengthInput] = useState("");
  const [attemptsInput, setAttemptsInput] = useState("");

  useEffect(() => {
    if (combinationLength > 0 && maxAttempts > 0) {
      reset();
    }
  }, [combinationLength, maxAttempts]);

  return (
    <>
      <div className="fixed left-1/2 top-10 transform -translate-x-1/2  flex flex-col h-[12vh] w-[25%]  bg-red-900  border-2 text-center z-5">
        <input
          value={lengthInput}
          onChange={(e) => setLengthInput(e.target.value)}
          className="text-center"
          type="text"
          placeholder="Insert combination length"
        />

        <input
          value={attemptsInput}
          onChange={(e) => setAttemptsInput(e.target.value)}
          className="text-center"
          type="text"
          placeholder="Insert maximum attempts"
        />

        <button
          onClick={() => {
            const length = Number(lengthInput);
            const attempts = Number(attemptsInput);
            if (!(length > 0 && attempts > 0)) return;
            setCombinationLength(length);
            setMaxAttempts(attempts);
          }}
        >
          Set
        </button>
      </div>
    </>
  );
}
