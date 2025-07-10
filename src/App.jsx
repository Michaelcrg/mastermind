import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";
import { Footer } from "./components/Footer.jsx";

function App() {
  const [combinationLength, setCombinationLength] = useState(5);
  const [maxAttempts, setMaxAttempts] = useState(25);

  return (
    <div className="flex relative items-center justify-center min-h-screen min-w-screen flex-col">
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
