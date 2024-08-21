import React, { useState } from "react";
import Question from '../Question/Question';
import "../Popup/Popup.css";

function Popup({
  teams,
  currentTeam,
  // handlePresent,
  handleChooseOther,
  handleTurn,
  isGameOver,
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




  const handleOtherTeamChange = (e) => {
    setOtherTeam(e.target.value);
  };

  const handleOther = () => {
    setShowTeamList(true);
  };

  const handleOtherTeamSelect = (team) => {
    console.log("get quiz question")
    setShowQuestion(true)
    const newTeams = teams.splice(teams.indexOf(team), 1);
    setOtherTeam(team);
    setShowTeamList(false);
    handleChooseOther(team);
    handleTurn();
  };

  return (
    <div className="popup-container ">
      <div className="popup">
{    !isGameOver &&    <div className="popup-presentation">
        <h3>Presentation Choice</h3>
        {!showTeamList && (
          <div>
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
        {showTeamList && (
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
      { showQuestion && <Question />}
{    isGameOver &&  <div className="popup-gameover">
        <h3>GAME OVER</h3>
        <p>{currentTeam}, go ahead and present!😈</p>

      </div>}
      </div>
    </div>
  );
}

export default Popup;
