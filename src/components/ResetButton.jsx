export function ResetButton({ reset }) {
  return (
    <button
      translate="no"
      onClick={reset}
      className="w-[3em] h-[1.5em] mt-9 flex justify-center items-center  text-sm text-center bg-black text-white "
    >
      Reset
    </button>
  );
}
