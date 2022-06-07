import React, {useEffect,useState} from 'react';
import MainScene from "./main"
import DahliaScene from "./dahliaBoss"
import Phaser from "phaser"
import CharacterSelection from './characterSelection';
import eventsCenter from '../scripts/EventEmitter';


export default function Main(props) {
    var game = null;
    
    const [charClass, setClassSelect] = useState();

    eventsCenter.on('classSelect', function(classChoice){
        setClassSelect(classChoice);
    })

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
            scene: [CharacterSelection, MainScene, DahliaScene] 
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
}