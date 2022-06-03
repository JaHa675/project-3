import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import creditbg from "../assets/backgrounds/UnpixeledBattleOption2.jpg"

class Credit extends Phaser.Scene {
    constructor () {
        super('Credit')
    }
    preload () {
        this.load.image('creditbg',creditbg)
    }
    create () {
        const bgImages = this.add.image(400,300,'creditbg');
    }
}

export default function Credits(props) {
    var game = null;

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: Credit
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}