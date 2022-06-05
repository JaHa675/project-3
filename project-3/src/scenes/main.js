import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import mainbg from "../assets/backgrounds/MainOption1.png"

class Mains extends Phaser.Scene {
    constructor () {
        super('Mains')
    }
    preload () {
        this.load.image('mainbg',mainbg)
    }
    create () {
        const bgImages = this.add.image(400,300,'mainbg');
    }
}

export default function Main(props) {
    var game = null;

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: Mains
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}