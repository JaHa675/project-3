import React, {useEffect} from 'react';
import { Scene } from "phaser";
// import playGame from "../phaserGame"
import dgBattle from "../assets/backgrounds/BattleOption5.png"
import bossPlatform from "../assets/extras/TomatoPlatform.png"
import dahliaBoss from '../assets/characters/Dahlia.png'
import dahliaBattlePos from '../assets/characters/DahliaBattlePositions.png'
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import mageBattlePos from "../assets/characters/MageBattlePositions.png"
import warriorBattlePos from "../assets/characters/WarriorBattlePositions.png"
import bridge from "../assets/extras/TomatoPlatform.png"

var player;
var platforms;
var cursors;
var boss;

class Dahlias extends Scene {
    constructor () {
        super('Dahlias')
    }
    preload () {
        this.load.image('dgBattle',dgBattle)
        this.load.image('bridge',bridge)
        this.load.image('bossPlatform',bossPlatform)
        this.load.spritesheet('mage',mage,{
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('dahliaBoss',dahliaBoss,{
            frameWidth: 48, frameHeight: 48
        });
    }
    create () {

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'dgBattle').refreshBody();
        // boss.create(100,450,'dahliaBoss');
        // .setScale(2) - option for images. Scales the size

        platforms.create(400, 500, 'bossPlatform').setScale(3);
        // platforms.create(750, 220, 'dgBattle');

        player = this.physics.add.sprite(350, 100, 'mage');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        boss = this.physics.add.sprite(450,100,'dahliaBoss');
        boss.setBounce(0.2);
        boss.setCollideWorldBounds(true);

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
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(boss, platforms);
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

export default Dahlias