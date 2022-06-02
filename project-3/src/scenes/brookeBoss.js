import React, {useEffect} from 'react';
import Phaser from "phaser";
import playGame from "../phaserGame.js"



export default function BattleTrail(props) {
    var game = null;

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: playGame
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}