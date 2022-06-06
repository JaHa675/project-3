import React, {useEffect} from 'react';
import Phaser from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption4.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import mageBattlePos from "../assets/characters/MageBattlePositions.png"
import warriorBattlePos from "../assets/characters/WarriorBattlePositions.png"
import mainOptions from "../assets/backgrounds/MainOption2.png"
import ground from "../assets/backgrounds/BattleOption4ground.png"
import door from "../assets/backgrounds/Door.png"
var player;
var platforms;
var cursors;
var door1;
var door2;
var door3;
var door4;
var door5;
var safeHouse;

class Main extends Phaser.Scene {
    constructor () {
        super('Main')
    }
    preload () {
        this.load.image('dgBattle',dgBattle)
        this.load.image('door',"../assets/backgrounds/Door.png")
        this.load.spritesheet('mage',mage,{frameWidth: 48, frameHeight: 48});
        this.load.image("ground", ground)
    }
    create () {
        // create a background 
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'dgBattle').refreshBody();

        // getting the player to render 
        player = this.physics.add.sprite(350, 100, 'mage');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // getting a ground to render on the bottom
        let groundX = this.sys.game.config.width / 3;
        let groundY = this.sys.game.config.height * .95;
        let ground = this.physics.add.image(groundX, groundY, "ground");
        ground.displayWidth = this.sys.game.config.width * 1.0;
        ground.setBounce(0);
        ground.setImmovable();
        ground.setCollideWorldBounds(true);

        // adding the door to the game 
        door1 = this.add.image(100, 440, 'door');
        // door1.create (100,440, 'door').setScale(3);
        door2 = this.add.image(300, 440, 'door');
        door3 = this.add.image(500, 440, 'door');
        door4 = this.add.image(700, 440, 'door');

        // player changing to righ left and center positions
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mage', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
     
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'mage', frame: 4} ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mage', { start: 6, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        cursors = this.input.keyboard.createCursorKeys();

        // collider only takes in two parameters
        this.physics.add.collider(player, ground);
        // this.physics.add.collider(boss, platforms);
    }
     update ()
    {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }

    }



export default function Dahlia(props) {
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
            scene: Main
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}