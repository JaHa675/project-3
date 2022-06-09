import React, {useEffect,useState} from 'react';
import MainScene from "./main"
import DahliaScene from "./dahliaBoss"
import JamesScene from "./jamesBoss"
import Phaser from "phaser"
import CharacterSelection from './characterSelection';
import eventsCenter from '../scripts/EventEmitter';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

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
            scene: [CharacterSelection, MainScene, DahliaScene,JamesScene] ,
            plugins: {
                scene: [{
                    key: 'rexUI',
                    plugin: RexUIPlugin,
                    mapping: 'rexUI'
                }]
            }
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
}