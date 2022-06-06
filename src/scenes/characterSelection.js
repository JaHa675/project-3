
import { Scene } from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption5.png"
import MainScene from "./main"
import warrior from "../assets/characters/Warrior.png"
import Mage from "../assets/characters/Mage.png"

var mage;
var platforms;
var cursors;
var graphics;
var text4;
var text5;
var text6;


class CharacterSelection extends Scene {
    constructor() {
        super('charSelect')
    }
    preload() {
        
        this.load.image('dgBattle', dgBattle)
        this.load.spritesheet('mage', Mage, {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('warrior', warrior, {frameWidth: 48, frameHeight: 48});
        
    }
    create() {
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'dgBattle').refreshBody();
        // creating animations for mage to walk in place
        this.anims.create({
            key: 'mageWalk',
            frames: this.anims.generateFrameNumbers('mage', { frames: [ 0, 1, 2,]}),
            frameRate: 7,
            repeat: -1, 
        });
        mage = this.add.sprite(250, 300, 'mage').setScale(3);
        mage.play('mageWalk');
    // creating animations for warrior to walk in place
        this.anims.create({
            key: 'warriorWalk',
            frames: this.anims.generateFrameNumbers('warrior', { frames: [ 0, 1, 2,]}),
            frameRate: 7,
            repeat: -1, 
        });
        warrior = this.add.sprite(550, 300, 'warrior').setScale(3);
        warrior.play('warriorWalk');

             text4 =this.add.text(230, 190, 'MAGE', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text5 =this.add.text(500, 190, 'WARRIOR', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text6=this.add.text(120,80, 'CHARACTER SELECTION:',{fontFamily:'"Press Start 2P',fontSize:'32px'})

            graphics = this.add.graphics();

            
    }
     update ()
    {
        graphics.lineStyle(2, 0xffffff, 2);
        graphics.strokeRectShape(text4.getBounds());
        graphics.strokeRectShape(text5.getBounds());
    }
}
export default CharacterSelection;