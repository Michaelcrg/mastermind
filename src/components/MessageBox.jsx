export function MessageBox({ endGame }) {
  if (endGame === "") return null;
  console.log(endGame);
  return (
    <div className="bg-red-900 text-center border-1 border-black text-white rounded-4xl my-glow w-[80%]  min-w-[200px]">
      {endGame === "win"
        ? "YOU BROKE THE CODE! RESET TO GO AGAIN"
        : "DEFEAT, RESET AND TRY AGAIN"}
    </div>
  );
}
