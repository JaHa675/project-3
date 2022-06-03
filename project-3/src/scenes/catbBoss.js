import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import catBattle from "../assets/backgrounds/CatBossBackground.jpg"
import CatSprite from "../assets/characters/CatBoss.png"

class Cat extends Phaser.Scene {
    constructor () {
        super('Cat')
    }
    preload () {
        this.load.image('catBattle',catBattle)
        this.load.spritesheet('CatSprite',CatSprite,
        { frameWidth: 48, frameHeight: 48 });
    }
    create () {
        const bgImages = this.add.image(400,300,'catBattle');
        const catBoii = this.add.spritesheet(100,200,'CatSprite');
    }
}


export default function CatBoss(props) {
    var game = null;
    // var background = 

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: Cat
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}