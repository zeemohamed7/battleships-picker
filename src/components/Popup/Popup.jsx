import React, { useState, useEffect } from "react";
import Question from '../Question/Question';
import "../Popup/Popup.css";

function Popup({
  teams,
  currentTeam,
  // handlePresent,
  handleChooseOther,
  handleTurn,
  isGameOver,
  currentQuestion,
  handleChangeQuestion
}) {
  const [otherTeam, setOtherTeam] = useState("");
  const [showTeamList, setShowTeamList] = useState(false);
  const [showGameover, setShowGameover] = useState(isGameOver);
  const [availableTeams, setAvailableTeams] = useState(teams);
  const [showQuestion, setShowQuestion] = useState(false)



  
  const handlePresent = (team) => {
    teams.splice(teams.indexOf(team), 1);
    handleTurn()
  };


  const handleCloseQuestion = () => {
    handleChangeQuestion()
    setShowQuestion(false)
      handleTurn()
  }

  const handleTeamAfterQuestion = (team) => {
    teams.splice(teams.indexOf(team), 1);


  }



  const handleOtherTeamChange = (e) => {
    setOtherTeam(e.target.value);
  };

  const handleOther = () => {
    setShowTeamList(true);
  };

  const handleOtherTeamSelect = (team) => {
    setOtherTeam(team);
    setShowQuestion(true)
    setShowTeamList(false)
    // handleTurn();
  };

  return (
    <div className="popup-container ">
      <div className="popup">
{    !isGameOver &&    <div className="popup-presentation">
        {!showTeamList && !showQuestion && (
          <div>
        <h3>Presentation Choice</h3>
            <p>{currentTeam}, do you want to present?</p>
            <div className="buttons">
              <button onClick={() => handlePresent(currentTeam)}>
                Present
              </button>
              <button onClick={handleOther}>Choose Other Team</button>
            </div>
          </div>
        )}
        {/* {otherTeam !== "" && (
          <div className="other-team">
            <label htmlFor="other-team">Other Team:</label>
            <input
              type="text"
              id="other-team"
              value={otherTeam}
              onChange={handleOtherTeamChange}
            />
            <button onClick={handleChooseOther}>Choose</button>
          </div>
        )} */}
        {showTeamList && !showQuestion && (
          <div className="team-list">
            <h4>Select another team:</h4>
            <ul>
              {availableTeams
                .filter((team) => team !== currentTeam)
                .map((team) => (
                  <button
                    className="team-choice-item"
                    key={team}
                    onClick={() => handleOtherTeamSelect(team)}
                  >
                    {team}
                  </button>
                ))}
            </ul>
          </div>
        )}
      </div>}
      { !showTeamList && showQuestion && <Question className="popup-question" otherTeam={otherTeam} currentTeam={currentTeam} handleTeamAfterQuestion={handleTeamAfterQuestion} currentQuestion={currentQuestion} handleCloseQuestion={handleCloseQuestion}/>}
{    isGameOver &&  <div className="popup-gameover">
        <h3>GAME OVER</h3>
        <p>{currentTeam}, go ahead and present!😈</p>

      </div>}
      </div>
    </div>
  );
}

export default Popup;
