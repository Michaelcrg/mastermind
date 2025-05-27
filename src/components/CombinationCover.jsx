import "../assets/fonts.css";

export function CombinationCover({ isWinner }) {
  if (isWinner) return null;

  return (
    <div
      style={{ fontFamily: "font" }}
      className="rounded-tr-3xl rounded-tl-3xl  bg-red-900  -blue-100 w-[100%] h-[13%] flex items-center justify-center text-xl absolute top-0 md:text-5xl"
    >
      Mastermind
    </div>
  );
}
