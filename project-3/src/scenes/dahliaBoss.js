import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import dgBattle from "../assets/backgrounds/BattleOption5.png"
import dahliaBoss from '../assets/characters/Dahlia.png'
var player;
var platforms;
var cursors;

class Dahlias extends Phaser.Scene {
    constructor () {
        super('Dahlias')
    }
    preload () {
        this.load.image('dgBattle',dgBattle)
        this.load.spritesheet('dahliaBoss',dahliaBoss,{
            frameWidth: 48, frameHeight: 48
        });
    }
    create () {
        // const bgImages = this.add.image(400,300,'dgBattle');
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'dgBattle').refreshBody();
        // .setScale(2) - option for images. Scales the size

        // platforms.create(600, 400, 'dgBattle');
        // platforms.create(50, 250, 'dgBattle');
        // platforms.create(750, 220, 'dgBattle');

        player = this.physics.add.sprite(100, 450, 'dahliaBoss');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dahliaBoss', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dahliaBoss', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dahliaBoss', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);
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
            scene: Dahlias
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}