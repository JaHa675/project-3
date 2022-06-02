import React, {useEffect} from 'react';
import Phaser from "phaser";
import playGame from "../phaserGame.js";
import brookeBattle from "../assets/backgrounds/PC Computer - RPG Maker MV - Forest.png"

class brookeBoss extends Phaser.Scene {
    constructor () {
        super('brookeBoss')
    }
    preload () {
        this.load.image('brookeBattle',brookeBattle)
    }
    create () {
        const bgImages = this.add.image(400,300,'brookeBattle');
    }
}

export default function Brooke(props) {
    var game = null;

    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: brookeBoss
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}