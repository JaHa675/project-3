import React from 'react';
import '../../styles/Stats.css'

export default function Stats() {
    return (
        <div className="container">
            <h1 className="currentPlayer">Player Name</h1>
            <div className="stats">
                <h2 className="topScores">Top Scores</h2>

                <div className="statLabels">
                <h3 className="rankLabel"> | Rank | </h3>
                <h3 className="playerLabel"> | Player Name |</h3>
                <h3 className="timeLabel">| Defeat Times |</h3>
                </div>
   
                <div className="fakeLabels">
                    <h4 className="fakeRank"> 1 </h4>
                    <h4 className="playerName"> JoeJoe </h4>
                    <h4 className="timeDefeated"> 100 </h4>
                </div>
            </div>
        </div>
    );
}