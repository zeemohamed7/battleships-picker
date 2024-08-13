import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import Popup from "../Popup/Popup";

export default function GameBoard(props) {
  const teams = [
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
  ];
  const [presentationOrder, setPresentationOrder] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [squares, setSquares] = useState(Array(36).fill(null));
  const [shipPositions, setShipPositions] = useState([]);
  useEffect(() => {
    initGame();
  }, []);


  
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

    // createTeamList();
  }

  function handleFire(index) {
    // Play audio
    const squareEls = document.querySelectorAll(".square");
    const square = squareEls[index];

    // Check if the shot hits a ship
    if (shipPositions.includes(index)) {
      square.classList.add("ship");
      square.classList.add("revealed");
      square.setAttribute("opacity", 0);
      console.log("Hit a ship!");

      const newShipPositions = [...shipPositions];
      newShipPositions.splice(newShipPositions.indexOf(index), 1);
      setShipPositions(newShipPositions);
      createExplosion(index);

      setTimeout(() => {
        square.classList.add("hidden");
      }, 2000);

      setTimeout(() => {
      askPresent();
      }, 1500);
    } else {
      createExplosion(index);
      setTimeout(() => {
        square.classList.add("missed");
      }, 1000);
      handleMiss();

    }
  }

  // Update the game message
  function updateGameMessage(message) {
    setGameMessage(message);
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

    // Remove the explosion container after the animation is finished
    setTimeout(() => {
      explosionContainer.remove();
    }, 1000);
  }

  const handlePresent = (team) => {
    setPresentationOrder([...presentationOrder, team]);
    console.log(presentationOrder)
    setShowPopup(false);
    setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
  };

  const handleChooseOther = (otherTeam) => {
    const otherTeamIndex = presentationOrder.indexOf(otherTeam);
    if (otherTeamIndex === -1) {
      setPresentationOrder([...presentationOrder, otherTeam]);
    } else {
      const newPresentationOrder = [...presentationOrder];
      newPresentationOrder.splice(otherTeamIndex, 1);
      newPresentationOrder.push(otherTeam);
      setPresentationOrder(newPresentationOrder);
    }
    setShowPopup(false);
  };


  function askPresent() {
    setShowPopup(true);
  }

  const handleMiss = () => {
    setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
  };

  return (
    <div className="body vt323-regular">
      <div className="message"></div>
      <div className="game-container">
        <div className="column-labels">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div className="temp">
          <div className="row-labels">
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
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
          handlePresent={handlePresent}
          handleChooseOther={handleChooseOther}
          presentationOrder={presentationOrder}
          
        />
      )}
      <div className="team-order">
        <ul>
        {presentationOrder.map((team) => (
          <li className="team-item" key={team}>{team}</li>
        ))}
        </ul>
      </div>
    </div>
  );
}
