import React, {useEffect,useState} from 'react';
import MainScene from "./main"
import DahliaScene from "./dahliaBoss"
import JamesScene from "./jamesBoss"
import LucasScene from "./lucasBoss"
import Phaser from "phaser"
import CharacterSelection from './characterSelection';
import eventsCenter from '../scripts/EventEmitter';
import House from './playerHouse'
import BrookeScene from "./brookeBoss"
import CatScene from "./catbBoss"
import CatDoors from "./finalBossDoors"
import TextBox from "./textbox"
import CreditsScene from "./credits"
export default function Main(props) {
    var game = null;
    
    // const [charClass, setClassSelect] = useState();

    // eventsCenter.on('classSelect', function(classChoice){
    //     setClassSelect(classChoice);
    // })

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
            // add both BrookeScene and Cat Scene back in if not there
            scene: [CharacterSelection, MainScene, DahliaScene,JamesScene, LucasScene, BrookeScene, CatScene, CatDoors, TextBox, House, CreditsScene] ,
        
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
}