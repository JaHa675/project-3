import React, {useEffect} from 'react';
import MainScene from "./main"
import DahliaScene from "./dahliaBoss"
import Phaser from "phaser"
import CharacterSelection from './characterSelection';






export default function Main(props) {
    var game = null;
    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: [CharacterSelection] 
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
}