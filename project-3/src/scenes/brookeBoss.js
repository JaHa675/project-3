import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame.js";
import brookeBattle from "../assets/backgrounds/BattleOption6.png"
import BrookeBoss from "../assets/characters/Brooke.png"

class brookeBoss extends Phaser.Scene {
    constructor () {
        super('brookeBoss')
    }
    preload () {
        this.load.image('brookeBattle',brookeBattle)
        this.load.spritesheet('BrookeBoss', 
        BrookeBoss,
        { frameWidth: 48, frameHeight: 48 }
    );
    }
    create () {
        const bgImages = this.add.image(400,300,'brookeBattle');
        const blSprite = this.add.spritesheet(100,200,'BrookeBoss');
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