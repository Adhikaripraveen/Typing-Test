import React, { useState, useEffect } from "react";

const quoteText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quasi, aspernatur, nisi sequi possimus iste, consectetur at neque eaque illo ipsum porro exercitationem unde vel est incidunt saepe consequuntur nihil inventore a cum? Labore, under`;

const InputField = () => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsRunning(false);
      calculateResults();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const startTest = () => {
    if (isRunning) return;
    setIsRunning(true);
    setInput("");
    setWpm(0);
    setAccuracy(100);
  };

  const resetTest = () => {
    setIsRunning(false);
    setInput("");
    setTimer(60);
    setWpm(0);
    setAccuracy(100);
  };

  const calculateResults = () => {
    const wordsTyped = input
      .trim()
      .split(" ")
      .filter((word) => word !== "").length;
    const correctChars = input.split("").reduce((acc, char, index) => {
      return char === quoteText[index] ? acc + 1 : acc;
    }, 0);
    const accuracy = (correctChars / quoteText.length) * 100;
    const wpm = (wordsTyped / 60) * (60 - timer);

    setWpm(Math.round(wpm));
    setAccuracy(Math.round(accuracy));
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "white",
        padding: "32.0px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "32.0px auto",
      }}
    >
      <h1 style={{ marginBottom: "16.0px", color: "#333" }}>
        Typing Speed Test
      </h1>
      <p style={{ fontSize: "19.2px", marginBottom: "16.0px", color: "#555" }}>
        {quoteText}
      </p>
      <textarea
        id="input-area"
        value={input}
        onChange={handleInputChange}
        disabled={!isRunning}
        placeholder="Start typing here..."
        style={{
          width: "100%",
          height: "100px",
          fontSize: "19.2px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          marginBottom: "16.0px",
        }}
		title="First Start the Test"
      />
      <div style={{ marginBottom: "16.0px", fontSize: "17.6px" }}>
        <p style={{ marginBottom: "16.0px", fontSize: "17.6px" }}>
          Time: <span id="timer">{timer}</span>s
        </p>
        <p style={{ marginBottom: "16.0px", fontSize: "17.6px" }}>
          Words per Minute: <span id="wpm">{wpm}</span>
        </p>
        <p style={{ marginBottom: "16.0px", fontSize: "17.6px" }}>
          Accuracy: <span id="accuracy">{accuracy}</span>%
        </p>
      </div>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16.0px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "5px",
        }}
        onClick={startTest}
        className="start-btn"
      >
        Start Test
      </button>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16.0px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "5px",
        }}
        onClick={resetTest}
        className="reset-btn"
      >
        Reset
      </button>
    </div>
  );
};

export default InputField;
