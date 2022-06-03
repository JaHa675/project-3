import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import lucasBattle from "../assets/backgrounds/BattleOption9.jpg"
import lucasBoss from "../assets/characters/Lucas.png"

class Lucass extends Phaser.Scene {
    constructor () {
        super('Lucass')
    }
    preload () {
        this.load.image('lucasBattle',lucasBattle)
        this.load.spritesheet('lucasBoss',lucasBoss,{
            frameWidth: 48, frameHeight: 48
        });
    }
    create () {
        const bgImages = this.add.image(400,300,'lucasBattle');
        const lucasSprite = this.add.spritesheet(100,200,'lucasBoss');
    }
}

export default function Lucas(props) {
    var game = null;

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: Lucass
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}