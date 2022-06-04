import React from 'react';
import mage from "../../assets/characters/Mage.png"
import warrior from "../../assets/characters/Warrior.png"
import '../../styles/PlayerSelect.css'

export default function PlayerSelection() {
    return (
        <div>
            <h1 id="charTitle">Choose Your Character</h1>
            <div id="classBox">
                <h3 id="mage">Mage</h3>
                <h3 id="warrior">Warrior</h3>
            </div>
            <div className="avatarBox">
                <img className="avatar pixelart" id="mage" src={mage} />
            </div>
                <br />
            <div className="avatarBox">
                <img className="avatar pixelart" id="warrior" src={warrior} style={{marginLeft: '200px'}}/>
            </div>
            
            <div id="buttonBox">
                <button>Select</button>
                <button>Select</button>
            </div>
        </div>
    )
}