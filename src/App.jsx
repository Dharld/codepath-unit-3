import { useEffect, useRef, useState } from "react";
import randomIcon from "../src/assets/random.png";
import "./App.css";
import { useToast } from "./toast.context";
import Input from "./components/input/input.component.jsx";
import Fuse from "fuse.js";

const CARDS = [
  {
    difficulty: "easy",
    question: "JavaScript's data type for whole numbers?",
    answer: "Number type",
  },
  {
    difficulty: "easy",
    question: "Keyword for block scope variables?",
    answer: "let keyword",
  },
  {
    difficulty: "easy",
    question: "How to comment a single line?",
    answer: "Using double slashes",
  },
  {
    difficulty: "easy",
    question: "Result of 5 + 3?",
    answer: "8",
  },
  {
    difficulty: "easy",
    question: "Logical AND operator in JavaScript?",
    answer: "&& operator",
  },
  {
    difficulty: "easy",
    question: "Check if variable is undefined?",
    answer: "Using typeof operator",
  },
  {
    difficulty: "easy",
    question: "What does NaN stand for?",
    answer: "Not a Number",
  },
  {
    difficulty: "medium",
    question: "What does JSON stand for?",
    answer: "JavaScript Object Notation",
  },
  {
    difficulty: "medium",
    question: "Method to convert string to lowercase?",
    answer: "toLowerCase() method",
  },
  {
    difficulty: "medium",
    question: "Ternary operator syntax?",
    answer: "condition ? trueValue : falseValue",
  },
];
function shuffleArray(array) {
  let copy = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]; // Swap elements at i and j indices
  }
  return copy;
}

function fuzzySearch(query, text) {
  // Convert both query and text to lowercase for case-insensitive matching
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();

  // Split the query into words
  const queryWords = queryLower.split(" ");

  // Check if each word in the query appears in the text
  for (const word of queryWords) {
    // Create a regular expression to match the word with any number of characters before or after
    const regex = new RegExp(`\\b${word}\\b`, "gi"); // Using word boundaries (\b) for exact word match

    // Check if the word exists in the text
    if (!regex.test(textLower)) {
      return false; // If any word is not found, return false
    }
  }

  return true; // If all words are found, return true
}

function App() {
  const { successToast, errorToast } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState(CARDS);
  const [currentCard, setCurrentCard] = useState(cards[activeIndex]);
  const [flip, setFlip] = useState(false);
  const [guess, setGuess] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    setCurrentCard(cards[activeIndex]);
  }, [activeIndex, cards]);

  useEffect(() => {
    setActiveIndex(0);
  }, [cards]);

  const flipCard = () => {
    setFlip(!flip);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setGuess(value);
  };

  const chooseNextCard = () => {
    setGuess("");
    setFlip(false);
    const lastIndex = cards.length - 1;
    setActiveIndex(activeIndex < lastIndex ? activeIndex + 1 : lastIndex);
  };

  const choosePrevCard = () => {
    setGuess("");
    setFlip(false);
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : 0);
  };

  const shuffleCards = () => {
    setFlip(false);
    let newCards = shuffleArray(cards);
    setCards(newCards);
    successToast("Cards shuffled");
  };

  const checkAnswer = (e) => {
    e.preventDefault();

    const res = fuzzySearch(guess, currentCard.answer);

    if (res) {
      setCurrentStreak(currentStreak + 1);
      successToast("Correct!");
    } else {
      setLongestStreak(
        currentStreak > longestStreak ? currentStreak : longestStreak
      );
      setCurrentStreak(0);
      errorToast("Invalid answer");
    }
  };
  const { question, answer, difficulty, image } = currentCard;

  return (
    <div className="container">
      <div className="streak">
        <h4>
          Streak: <span className="value"> {currentStreak}</span>
        </h4>
        <h4>
          Longest Streak: <span className="value"> {longestStreak}</span>
        </h4>
      </div>
      <div className="header">
        <h3 className="title">Learn JS</h3>
        <div className="description">
          <p>
            LearnJS is a comprehensive and interactive platform designed to help
            users learn JavaScript programming language effectively.{" "}
          </p>
        </div>
        <div className="number-card">Number of cards</div>
        <div className="card-container">{cards.length}</div>
        <ul className="difficulties">
          <li className="easy">Easy</li>
          <li className="medium">Medium</li>
          <li className="hard">Hard</li>
        </ul>
      </div>

      <div className="cards">
        <div className="arrow arrow-left" onClick={choosePrevCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="greenyellow"
          >
            <path d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" />
          </svg>
        </div>
        <div className="arrow arrow-right" onClick={chooseNextCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="greenyellow"
          >
            <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z" />
          </svg>
        </div>
        <div className={`card ${flip ? "flipped" : ""}`} onClick={flipCard}>
          <div className={`content ${difficulty}`}>
            <div className="front">
              {image && <img src={image} />}
              <div>{question}</div>
            </div>
            <div className={`back ${difficulty}`}>{answer}</div>
          </div>
        </div>
      </div>
      <form className="wrapper" onSubmit={checkAnswer}>
        <Input
          label="Enter your guess"
          value={guess}
          handleChange={handleChange}
        />
        <button className="submit-button" type="submit">
          Submit Guess
        </button>
      </form>
      <div className="button-wrapper">
        <button className="shuffle-button" onClick={shuffleCards}>
          <img src={randomIcon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
