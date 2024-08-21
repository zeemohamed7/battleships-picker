import React, { useState, useEffect } from "react";
import '../Gameboard.css'; 
import Popup from "../Popup/Popup";

export default function GameBoard(props) {
  const [teams, setTeams] = useState([
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
  ])
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [inTurn, setInTurn] = useState(false)
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [shipPositions, setShipPositions] = useState([]);
  const [turn, setTurn] = useState(1);
  const [message, setMessage] = useState('Start!');
  const [isGameOver, setIsGameOver] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)



  const messageContainer = document.querySelector(".message-container")


  useEffect(() => {
    initGame();
  }, []);



  const handleTurn = () => {
    setShowPopup(false);

    setInTurn(false);
    setTurn(turn + 1); 

  setCurrentTeamIndex((currentTeamIndex + 1) % teams.length); 
  if (teams.length === 1) {
    setIsGameOver(true)
  }
    
  };

  const handleMessageColor = (fire) => {
    if ( fire === 'hit' ) {
      messageContainer.classList.remove("miss");

      messageContainer.classList.add("hit");
    } 

    if ( fire === 'miss' ) {
      messageContainer.classList.remove("hit");

      messageContainer.classList.add("miss");
    } 
  }
  
  const handleChangeQuestion = () => {
    // console.log("changing question: " + (currentQuestion + 1))
    setCurrentQuestion(currentQuestion + 1)
  }
  
  // Initialize the game
  function initGame() {
    function getRandomNumber() {
      return Math.floor(Math.random() * 25);
    }

    const newShipPositions = [];
    while (newShipPositions.length < 10) {
      const randomPosition = getRandomNumber();
      if (!newShipPositions.includes(randomPosition)) {
        newShipPositions.push(randomPosition);
      }

    }
    setShipPositions(newShipPositions);
    console.log("Ship positions:", newShipPositions);

  }

  function handleFire(index) {
    setInTurn(true)
    // Play audio


    const squareEls = document.querySelectorAll(".square");
    const square = squareEls[index];


    // Check if the shot hits a ship
    // HIT
    if (shipPositions.includes(index)) {
      square.classList.add("ship");
      square.classList.add("revealed");
      square.setAttribute("opacity", 0);
      handleMessageColor("hit")
      setMessage(`${teams[currentTeamIndex]} hit a ship!`);

      setShowPopup(true);




      const newShipPositions = [...shipPositions];
      newShipPositions.splice(newShipPositions.indexOf(index), 1);
      // 🪿🪿🪿🪿🪿 Remove team from list 
      setShipPositions(newShipPositions);
      createExplosion(index);

      setTimeout(() => {
        square.classList.add("hidden");
      }, 2000);



    } 
    // MISS
    else {
      createExplosion(index);
      setMessage(`Miss!`);
      handleMessageColor("miss")
      setTimeout(() => {
        square.classList.add("missed");

      }, 1000);

      handleTurn()
    }


  }


  function createExplosion(index) {
    const squareEls = document.querySelectorAll(".square");
    const square = squareEls[index];
    const squareRect = square.getBoundingClientRect();

    const explosionContainer = document.createElement("div");
    explosionContainer.classList.add("explosion-container");
    explosionContainer.style.position = "absolute";
    explosionContainer.style.left = `${squareRect.left}px`;
    explosionContainer.style.top = `${squareRect.top}px`;
    explosionContainer.style.width = `${squareRect.width}px`;
    explosionContainer.style.height = `${squareRect.height}px`;
    explosionContainer.style.overflow = "hidden";

    const explosionFrame = document.createElement("div");
    explosionFrame.classList.add("explosion-frame");
    explosionContainer.appendChild(explosionFrame);

    document.body.appendChild(explosionContainer);

    setTimeout(() => {
      explosionContainer.remove();
    }, 1000);
  }


  const handleChooseOther = (otherTeam) => {

    setShowPopup(false);
  };




  return (
    <div className="body vt323-regular">
      <div className="game-container">
      <h3 className="" >Current Team: {teams[currentTeamIndex]}</h3>
      <div className="message-container">
      <p className="message">{message}</p>
      </div>
        <div className="column-labels">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          {/* <div>6</div> */}
        </div>
        <div className="temp">
          <div className="row-labels">
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            {/* <div>F</div> */}
          </div>
          <div className="game-board">
            {squares.map((square, index) => (
              <div
                key={index}
                className="square"
                onClick={() => handleFire(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup
        teams={teams}
          currentTeam={teams[currentTeamIndex]}
          // handlePresent={handlePresent}
          handleChooseOther={handleChooseOther}
          handleTurn={handleTurn}
          isGameOver={isGameOver}
          currentQuestion={currentQuestion}
          handleChangeQuestion={handleChangeQuestion}
          
        />
      )}
      <div className="team-container">
        <ul>
        <h4>Teams left</h4>

        {teams.map((team) => (
          <li className="team-item" key={team}>{team}</li>
        ))}
        </ul>
      </div>
    </div>
  );
}
