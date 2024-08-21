import React, { useState } from 'react'

export default function Question({ currentTeam, otherTeam, handleTeamAfterQuestion, currentQuestion, handleChangeQuestion, handleCloseQuestion }) {


  const questions = [
    {
      question: "What does JSX stand for?",
      options: [
        "JavaScript Syntax",
        "JavaScript XML",
        "Java Script eXtensions",
        "Just Simple eXtensions"
      ],
      answer: 1
    },
    {
      question: "What is a component in React?",
      options: [
        "A reusable piece of UI",
        "A function that handles user input",
        "A data structure that stores information",
        "A style sheet for the application"
      ],
      answer: 0
    },
    {
      question: "How do you pass data to a component in React?",
      options: [
        "Using props",
        "Using state",
        "Using events",
        "Using functions"
      ],
      answer: 0
    },
    {
      question: "What is the purpose of the `useState` hook?",
      options: [
        "To manage the component's state",
        "To handle user input",
        "To create reusable components",
        "To fetch data from the server"
      ],
      answer: 0
    },
    {
      question: "What is the purpose of the `useEffect` hook?",
      options: [
        "To perform side effects, like fetching data or setting up event listeners",
        "To manage the component's state",
        "To handle user input",
        "To create reusable components"
      ],
      answer: 0
    },
    {
      question: "What is the purpose of the `return` statement in a functional component?",
      options: [
        "To return the JSX that represents the component's UI",
        "To update the component's state",
        "To handle user input",
        "To create a new component"
      ],
      answer: 0
    },
    {
      question: "What is a virtual DOM in React?",
      options: [
        "A lightweight representation of the actual DOM",
        "A database that stores all the data for the application",
        "A network that connects all the components together",
        "A tool for debugging React applications"
      ],
      answer: 0
    },
    {
      question: "Which of these is NOT a valid way to write JSX?",
      options: ["<div>Hello, world!</div>", "<h1>{name}</h1>", "<p>This is a paragraph.</p>", "console.log(<p>This is a paragraph.</p>)"],
      answer: 3
    },
      {
    question: "What is the main purpose of the `render` method in a class component?",
    options: [
      "To handle user input",
      "To update the component's state",
      "To define the component's structure and appearance",
      "To manage the component's lifecycle"
    ],
    answer: 2 // Index of the correct answer
  },
  {
    question: "What is the purpose of the `key` prop when rendering lists in React?",
    options: [
      "To provide a unique identifier for each item in the list",
      "To improve performance by helping React identify which items have changed",
      "To style individual items in the list",
      "To bind event handlers to each item in the list"
    ],
    answer: 1
  },  {
    question: "What is the purpose of the `useContext` hook?",
    options: [
      "To access data from the global context",
      "To manage the component's state",
      "To handle user input",
      "To create reusable components"
    ],
    answer: 0
  },  {
    question: "What is the difference between a controlled and uncontrolled form in React?",
    options: [
      "Controlled forms use state to manage input values, while uncontrolled forms use DOM values",
      "Controlled forms are more efficient, while uncontrolled forms are more flexible",
      "Controlled forms are used for simple forms, while uncontrolled forms are used for complex forms",
      "There is no difference between controlled and uncontrolled forms"
    ],
    answer: 0
  },  {
    question: "What is the primary benefit of using React Router?",
    options: [
      "To manage the component's state",
      "To handle user input",
      "To create single-page applications with navigation",
      "To optimize the component's performance"
    ],
    answer: 2
  },
  ];





  const [message, setMessage] = useState("")
  const [answering, setAnswering] = useState(true)


  const handleAnswerClick = (selectedOption) => {
  // If otherteam answer right, current team has to present
    if (selectedOption === questions[currentQuestion].answer) {
      // current team has to present
      setMessage("Correct! " + currentTeam + " has to present!")
      setAnswering(false)
      handleTeamAfterQuestion(currentTeam)
      if (!answering) {
        handleCloseQuestion()

      }

    } else {
      // other team has to present
      setMessage("Incorrect. " + otherTeam + " has to present!")
      setAnswering(false)
      handleTeamAfterQuestion(otherTeam)
      if (!answering) {
        handleCloseQuestion()

      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
    } else {
      // Quiz finished so exit
    }
  };

  return (
    <div className="quiz-container">
      <h3>{currentTeam} vs {otherTeam}</h3>
      <div className="question">
        { answering && questions[currentQuestion].question}
      </div>
{  !answering &&    <div className='message-container'>{message}</div>}
{  !answering &&    <button className='close-button' onClick={handleCloseQuestion} >Close</button>}
{  answering &&    <ul>
  
        {questions[currentQuestion].options.map((option, index) => (
          <button className='option'
            key={index} 
            onClick={() => handleAnswerClick(index)}
          >
            {option}
          </button>
        ))}
      </ul>}
    </div>
  )
}
