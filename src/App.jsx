import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";
import { Footer } from "./components/Footer.jsx";

function App() {
  const [combinationLength, setCombinationLength] = useState(10);

  const [maxAttempts, setMaxAttempts] = useState(10);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen ">
      <Board
        combinationLength={combinationLength}
        maxAttempts={maxAttempts}
        setCombinationLength={setCombinationLength}
        setMaxAttempts={setMaxAttempts}
      />
      <Footer />
    </div>
  );
}

export default App;
