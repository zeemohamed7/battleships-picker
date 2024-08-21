import React, { useState } from 'react'

export default function Question({ currentTeam, otherTeam, handleTeamAfterQuestion, currentQuestion, handleChangeQuestion, handleCloseQuestion }) {


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
      console.log("wrong")
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
      <h3>{otherTeam}</h3>
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
