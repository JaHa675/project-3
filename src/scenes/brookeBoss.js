import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame.js";
import mage from "../assets/characters/Mage.png"
import blBattle from "../assets/backgrounds/BattleOption8.jpg"
import BrookeBoss from '../assets/characters/Brooke.png'
import ground from "../assets/backgrounds/BattleOption4ground.png"
var player;
var platforms;
var cursors;
var boss;
var graphics;
var selectText;
var attackText;
var defendText;
var text6;
var text7;

class Brookes extends Phaser.Scene {
    constructor () {
        super('Brookes')
    }
    preload () {
        this.load.image('blBattle',blBattle)
        this.load.spritesheet('BrookeBoss',BrookeBoss,{frameWidth: 48, frameHeight: 48});
        this.load.image("ground", ground)
        this.load.spritesheet('mage', mage, {
            frameWidth: 48, frameHeight: 48
        });
    }
    create () {

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'blBattle').refreshBody();

        // getting a ground to render on the bottom
        let groundX = this.sys.game.config.width /2 ;
        let groundY = this.sys.game.config.height * .95;
        let ground = this.physics.add.image(groundX, groundY, "ground");
        
        ground.displayWidth = this.sys.game.config.width * 1.0;

        ground.setCollideWorldBounds(true).setImmovable().setBounce(0);
        

        boss = this.physics.add.sprite(500, 450, 'BrookeBoss').setBounce(0.2).setCollideWorldBounds(true);
        // player.setCollideWorldBounds(true);
        player = this.physics.add.sprite(200, 450, 'mage').setBounce(0.2).setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        // makes the boss touch the ground
        this.physics.add.collider(boss, platforms);
        this.physics.add.collider(boss, ground);

        // makes the boss touch the ground
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, ground);
        
        // sets the data 
        boss.setDataEnabled()
        player.setDataEnabled();

        selectText = this.add.text(50, 480, 'SELECT:', { fontFamily: '"Press Start 2P"' });
        attackText = this.add.text(50, 505, 'ATTACK', { fontFamily: '"Press Start 2P"' }).setPadding(5).setInteractive();
        defendText = this.add.text(50, 545, 'DEFEND', { fontFamily: '"Press Start 2P"' }).setPadding(5);
    }
     update ()
    {
        // if (cursors.left.isDown)
        // {
        //     player.setVelocityX(-160);

        //     player.anims.play('left', true);
        // }
        // else if (cursors.right.isDown)
        // {
        //     player.setVelocityX(160);

        //     player.anims.play('right', true);
        // }
        // else
        // {
        //     player.setVelocityX(0);

        //     player.anims.play('turn');
        // }

        // if (cursors.up.isDown && player.body.touching.down)
        // {
        //     player.setVelocityY(-330);
        // }
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
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: Brookes
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}