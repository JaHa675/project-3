import Phaser from "phaser";
import test from "../assets/extras/TomatoPlatform.png"


var platforms;
class TextBox extends Phaser.Scene {
    constructor(){
        super('BattleLog')
    }
    preload () {
        this.load.image('tomato', test)
    }
    create () {
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'tomato').refreshBody();
    }
    update () {

    }
}

export default TextBox;