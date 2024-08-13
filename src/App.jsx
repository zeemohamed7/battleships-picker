import React, { useState } from 'react'
import Gameboard from './components/Gameboard/Gameboard'

export default function App() {
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
  ]);
  
  return (
    <>
      <Gameboard teams={teams}/>
    </>
  )
}
