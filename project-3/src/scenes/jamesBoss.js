import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import jamesBattle from "../assets/backgrounds/BattleOption2.png"
import jamesBoss from "../assets/characters/James.png"

class JamesH extends Phaser.Scene {
    constructor () {
        super('jamesBoss')
    }
    preload () {
        this.load.image('jamesBattle',jamesBattle)
        this.load.spritesheet('jamesBoss',jamesBoss,{
            frameWidth: 48, frameHeight: 48
        });
        
    }
    create () {
        const bgImages = this.add.image(400,300,'jamesBattle');
        const jamesSprite=this.add.spritesheet(100,200,'jamesBoss');
    }
}

export default function James(props) {
    var game = null;

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: JamesH
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}