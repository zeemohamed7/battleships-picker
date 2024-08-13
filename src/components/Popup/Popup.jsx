import React, { useState } from "react";
import "./Popup.css";

function Popup({ teams, currentTeam, handlePresent, handleChooseOther, presentationOrder }) {
  const [otherTeam, setOtherTeam] = useState("");
  const [showTeamList, setShowTeamList] = useState(false);
  const availableTeams = teams.filter((team) => !presentationOrder.includes(team) && team !== currentTeam);

  const handleOtherTeamChange = (e) => {
    setOtherTeam(e.target.value);
  };

  const handleOther = () => {
    setShowTeamList(true);
  };

  const handleOtherTeamSelect = (team) => {
    setOtherTeam(team);
    setShowTeamList(false);
    handleChooseOther(team);
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>Presentation Choice</h3>
{   !showTeamList &&     <div>
        <p>{currentTeam}, do you want to present?</p>
          <div className="buttons">
            <button onClick={() => handlePresent(currentTeam)}>Present</button>
            <button onClick={handleOther}>Choose Other Team</button>
          </div>
          </div>}
        {otherTeam !== "" && (
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
        )}
        {showTeamList && (
          <div className="team-list">
            <h4>Select another team:</h4>
            <ul>
              {availableTeams
                .filter((team) => team !== currentTeam)
                .map((team) => (
                  <button className="team-choice-item" key={team} onClick={() => handleOtherTeamSelect(team)}>
                    {team}
                  </button>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Popup;
