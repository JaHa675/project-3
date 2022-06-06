
import { Scene } from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption5.png"
<<<<<<< HEAD
import bossPlatform from "../assets/extras/TomatoPlatform.png"
import warrior from "../assets/characters/Warrior.png"
import mage from "../assets/characters/Mage.png"
import MainScene from "./main"

var player;
=======
// import bossPlatform from "../assets/extras/TomatoPlatform.png"
import dahliaBoss from '../assets/characters/Dahlia.png'
import test from "./dahliaBoss"

import warrior from "../assets/characters/Warrior.png"
import Mage from "../assets/characters/Mage.png"

var mage;
>>>>>>> dev
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
<<<<<<< HEAD
        this.load.image('bossPlatform', bossPlatform)
        this.load.spritesheet('mage', mage, {
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('warrior', warrior, {
            frameWidth: 48, frameHeight: 48
        });
=======
        this.load.spritesheet('mage', Mage, {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('warrior', warrior, {frameWidth: 48, frameHeight: 48});
>>>>>>> dev
        
    }
    create() {
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'dgBattle').refreshBody();
<<<<<<< HEAD

        platforms.create(400, 500, 'bossPlatform').setScale(3);

        player = this.physics.add.sprite(250, 300, 'mage').setScale(3);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        warrior = this.physics.add.sprite(550, 300, 'warrior').setScale(3);
        
        warrior.setBounce(0.2);
        warrior.setCollideWorldBounds(true);


        cursors = this.input.keyboard.createCursorKeys();
        
        this.input.keyboard.on('keydown-Y', () => {
            this.scene.start('main', MainScene, true, {x:800, y:600})
        }, this);

=======
        // creating animations for mage to walk in place
>>>>>>> dev
        this.anims.create({
            key: 'mageWalk',
            frames: this.anims.generateFrameNumbers('mage', { frames: [ 0, 1, 2,]}),
            frameRate: 7,
            repeat: -1, 
        });
<<<<<<< HEAD
        warrior.play('walk');


        // collider only takes in two parameters
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(boss, platforms);

        const text= this.add.text(50,50,'');
        const text2= this.add.text(20,20,'');

        const list = [ 'Battle Data:', '' ];
        player.setDataEnabled();

        player.on('setdata', function (gameObject, key, value) {
            list.push(key);
            text2.setText(list);
=======
        mage = this.add.sprite(250, 300, 'mage').setScale(3);
        mage.play('mageWalk');
    // creating animations for warrior to walk in place
        this.anims.create({
            key: 'warriorWalk',
            frames: this.anims.generateFrameNumbers('warrior', { frames: [ 0, 1, 2,]}),
            frameRate: 7,
            repeat: -1, 
>>>>>>> dev
        });
        warrior = this.add.sprite(550, 300, 'warrior').setScale(3);
        warrior.play('warriorWalk');

             text4 =this.add.text(230, 190, 'MAGE', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text5 =this.add.text(500, 190, 'WARRIOR', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text6=this.add.text(120,80, 'CHARACTER SELECTION:',{fontFamily:'"Press Start 2P',fontSize:'32px'})

            graphics = this.add.graphics();

<<<<<<< HEAD
            
=======
            cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.on('keydown-A', () => {
                this.scene.add('test', test, true, {x:800, y:600})
            }, this);
>>>>>>> dev
    }
     update ()
    {
        graphics.lineStyle(2, 0xffffff, 2);
        graphics.strokeRectShape(text4.getBounds());
        graphics.strokeRectShape(text5.getBounds());
    }
}
export default CharacterSelection;