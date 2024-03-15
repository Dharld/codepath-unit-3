import { useEffect, useState } from "react";
import randomIcon from "../src/assets/random.png";
import "./App.css";
import { useToast } from "./toast.context";
import Input from "./components/input/input.component.jsx";

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

function App() {
  const { successToast, errorToast } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState(CARDS);
  const [currentCard, setCurrentCard] = useState(cards[activeIndex]);
  const [flip, setFlip] = useState(false);
  const [guess, setGuess] = useState("");

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
    setFlip(false);
    const lastIndex = cards.length - 1;
    setActiveIndex(activeIndex < lastIndex ? activeIndex + 1 : lastIndex);
  };

  const choosePrevCard = () => {
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
    console.log("Checking answer");
    e.preventDefault();
    if (guess.toLowerCase() === currentCard.answer.toLowerCase()) {
      successToast("Correct!");
    } else {
      errorToast("Invalid answer");
    }
  };
  const { question, answer, difficulty, image } = currentCard;

  return (
    <div className="container">
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
