import "../assets/fonts.css";

export function CombinationCover({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div
      style={{ fontFamily: "font" }}
      className="rounded-tr-3xl rounded-tl-3xl md:text-6xl   bg-red-900 h-[11.8vh] md:h-[15vh]  w-[100%] flex items-center justify-center text-xl absolute top-0 "
    >
      Mastermind
    </div>
  );
}
