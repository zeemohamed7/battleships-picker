import React, { useState } from 'react'

export default function Question({ currentTeam, otherTeam }) {


  const questions = [
    {
      question: "What is the core building block of a React application?",
      options: ["Functions", "Classes", "Components", "Variables"],
      answer: 2
    },
    {
      question: "Which of these is NOT a valid way to write JSX?",
      options: ["<div>Hello, world!</div>", "<h1>{name}</h1>", "<p>This is a paragraph.</p>", "console.log(<p>This is a paragraph.</p>)"],
      answer: 3
    },
    {
      question: "What is the purpose of the `props` object in a React component?",
      options: ["To store the component's state", "To pass data from parent to child components", "To handle events within the component", "To define the component's styling"],
      answer: 1
    },
    // ... add more questions here
  ];





  const [currentQuestion, setCurrentQuestion] = useState(0)


  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
  // if otherteam answer right, current team has to present

    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Quiz finished
    }
  };

  return (
    <div className="quiz-container">
      <div className="question">
        {questions[currentQuestion].question}
      </div>
      <ul>
        {questions[currentQuestion].options.map((option, index) => (
          <button className='option'
            key={index} 
            onClick={() => handleAnswerClick(index)}
          >
            {option}
          </button>
        ))}
      </ul>
      {/* Display score or quiz finished message here */}
    </div>
  )
}
