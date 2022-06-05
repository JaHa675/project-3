import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import housebg from "../assets/backgrounds/SafeHouse.png"

class playerHouse extends Phaser.Scene {
    constructor () {
        super('playerHouse')
    }
    preload () {
        this.load.image('housebg',housebg)
    }
    create () {
        const bgImages = this.add.image(400,300,'housebg');
    }
}

export default function House(props) {
    var game = null;

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: playerHouse
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}