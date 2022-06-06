import React from 'react';
import mage from "../../assets/characters/Mage.png"
import warrior from "../../assets/characters/Warrior.png"
import '../../styles/PlayerSelect.css'

export default function PlayerSelection() {
    return (
        <div>
            <h1 id="charTitle">Choose Your Character</h1>
            <div id="classBox">
            </div>
            <div className="characterArea">
                <div className="characterBox">
                <h3 style={{marginLeft:"55px"}}>Mage</h3>
                    <div className="avatarBox">
                        <img className="avatar pixelart" id="mage" src={mage} />
                    </div>
                    <button style={{width: "200px"}}>Select</button>
                </div>
                    <br />

                <div className="characterBox">
                <h3>Warrior</h3>
                    <div className="avatarBox">
                        <img className="avatar pixelart" id="warrior" src={warrior}/>
                    </div>
                    <button style={{width: "200px"}}>Select</button>
                </div>
            </div>
            <div id="buttonBox">
            </div>
        </div>
    )
}