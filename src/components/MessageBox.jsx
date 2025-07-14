export function MessageBox({ endGame }) {
  if (endGame === "") return null;
  console.log(endGame);
  return (
    <div className="bg-red-900 text-center border-1 border-white text-white rounded-4xl my-glow">
      {endGame === "win" ? "CORRECT COMBINATION!" : "NO MORE ATTEMPTS"}
    </div>
  );
}
