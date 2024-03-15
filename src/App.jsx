import { useEffect, useState } from "react";
import randomIcon from "../src/assets/random.png";
import "./App.css";
import { ToasterProvider, useToast } from "./toast.context";

const cards = [
  {
    question:
      "What is JavaScript and what is its primary use in web development?",
    answer:
      "JavaScript is a programming language used primarily for adding interactivity and dynamic behavior to web pages. It is commonly used to create interactive features like form validation, animations, and handling user interactions.",
    difficulty: "easy",
  },
  {
    question: "Identify the output of the following JavaScript code snippet:",
    image: "../src/assets/snippet.webp",
    answer: `6--33--33--6--3--30
      `,
    difficulty: "medium",
  },
  {
    question: "Describe the difference between == and === in JavaScript.",
    answer:
      "The == operator compares values after converting them to a common type, whereas the === operator compares both values and types. The === operator is stricter and typically recommended for comparing values in JavaScript.",
    difficulty: "medium",
  },
  {
    question: "What are JavaScript data types? Provide examples for each.",
    answer:
      "JavaScript has several data types, including string, number, boolean, null, undefined, object, and symbol. Examples: string ('hello'), number (42), boolean (true), null (null), undefined (undefined), object ({ key: 'value' }), symbol (Symbol('foo')).",
    difficulty: "medium",
  },
  {
    question:
      "Explain the concept of closures in JavaScript. Provide an example.",
    answer:
      "Closures are functions that have access to the variables from their containing scope even after the scope has closed. They are created whenever a function is defined within another function. Example: function outerFunction() { const outerVariable = 'I am outer'; return function innerFunction() { console.log(outerVariable); }; } const innerFunc = outerFunction(); innerFunc(); // Output: 'I am outer'",
    difficulty: "hard",
  },
  {
    question:
      "What is the purpose of the 'use strict' directive in JavaScript?",
    answer:
      "The 'use strict' directive enables strict mode in JavaScript, which makes it easier to write secure and optimized code. It catches common coding mistakes and prohibits certain unsafe actions. It is recommended to use strict mode in all JavaScript code.",
    difficulty: "hard",
  },
  {
    question: "Explain the concept of hoisting in JavaScript.",
    answer:
      "Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase. This means that variables and functions can be used before they are declared. However, only the declarations are hoisted, not the initializations. Example: console.log(myVar); // Output: undefined var myVar = 'hello';",
    difficulty: "hard",
  },
  {
    question:
      "What are the differences between 'null' and 'undefined' in JavaScript?",
    answer:
      "In JavaScript, 'null' represents the intentional absence of any value, while 'undefined' represents the absence of a value that has not been assigned. 'null' is a primitive value, while 'undefined' is a type and also a value.",
    difficulty: "easy",
  },
  {
    question:
      "Explain the event bubbling and event capturing mechanisms in JavaScript.",
    answer:
      "Event bubbling and event capturing are two event propagation mechanisms in JavaScript. Event bubbling means that events propagate from the innermost element to the outermost element, while event capturing means that events propagate from the outermost element to the innermost element. By default, most modern browsers use event bubbling.",
    difficulty: "medium",
  },
  {
    question: "What are arrow functions in JavaScript? Provide an example.",
    answer:
      "Arrow functions are a shorthand syntax for writing function expressions in JavaScript. They provide a more concise syntax and lexically bind the 'this' keyword. Example: const add = (a, b) => a + b; console.log(add(3, 5)); // Output: 8",
    difficulty: "easy",
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j indices
  }
  return array;
}

function App() {
  const { successToast, errorToast } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(cards[activeIndex]);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setCurrentCard(cards[activeIndex]);
  }, [activeIndex]);

  const flipCard = () => {
    setFlip(!flip);
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
    shuffleArray(cards);
    setActiveIndex(0);
  };

  const { question, answer, difficulty, image } = currentCard;

  return (
    <ToasterProvider>
      <div className="container">
        <div className="header">
          <h3 className="title">Learn JS</h3>
          <div className="description">
            <p>
              LearnJS is a comprehensive and interactive platform designed to
              help users learn JavaScript programming language effectively.{" "}
            </p>
          </div>
          <div className="number-card">Number of cards</div>
          <div className="card-container">{cards.length}</div>
        </div>

        <div className="cards">
          <div className={`card ${flip ? "flipped" : ""}`} onClick={flipCard}>
            <div className={`content ${difficulty}`}>
              <div className="front">
                {image && <img src={image} alt />}
                <div>{question}</div>
              </div>
              <div className={`back ${difficulty}`}>{answer}</div>
            </div>
          </div>
          <button className="arrow arrow-next" onClick={shuffleCards}>
            <img src={randomIcon} alt="" />
          </button>
        </div>
        <ul className="difficulties">
          <li className="easy">Easy</li>
          <li className="medium">Medium</li>
          <li className="hard">Hard</li>
        </ul>
      </div>
    </ToasterProvider>
  );
}

export default App;
