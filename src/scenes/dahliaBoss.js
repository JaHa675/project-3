import React, { useEffect } from 'react';
import Phaser from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption5.png"
import bossPlatform from "../assets/extras/TomatoPlatform.png"
import dahliaBoss from '../assets/characters/Dahlia.png'
// import dahliaBattlePos from '../assets/characters/DahliaBattlePositions.png'
import mage from "../assets/characters/Mage.png"
// import warrior from "../assets/characters/Warrior.png"
// import mageBattlePos from "../assets/characters/MageBattlePositions.png"
// import warriorBattlePos from "../assets/characters/WarriorBattlePositions.png"

import bridge from "../assets/extras/TomatoPlatform.png"
import { mageAttack, warriorAttack } from '../scripts/attack';
import { getOneCharacter } from '../utils/API';

import MainScene from "./main"
const currentChar = getOneCharacter(1);



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

class Dahlias extends Phaser.Scene {
    constructor() {
        super('Dahlias')
    }
    preload() {
        this.load.image('dgBattle', dgBattle)
        this.load.image('bridge', bridge)
        this.load.image('bossPlatform', bossPlatform)
        this.load.spritesheet('mage', mage, {
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('dahliaBoss', dahliaBoss, {
            frameWidth: 48, frameHeight: 48
        });
    }
    create() {
        
        platforms = this.physics.add.staticGroup();
        
        platforms.create(400, 300, 'dgBattle').refreshBody();
        
        platforms.create(400, 500, 'bossPlatform').setScale(3);
        
        player = this.physics.add.sprite(350, 100, 'mage');
        
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        
        boss = this.physics.add.sprite(450, 100, 'dahliaBoss');
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
            frames: [{ key: 'mage', frame: 4 }],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mage', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

// Scene change handler currently on key, needs to be onClick or bound condtionally
//  Please leave console logs for testing purposes as the game grows
        cursors = this.input.keyboard.createCursorKeys();
        var dahliaBossDefeated = null
        this.input.keyboard.on('keydown-R', () => {
            // console.log('R button pressed');
            this.scene.switch('Mains')
        }, this);

        // collider only takes in two parameters
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(boss, platforms);
        
        const playerText = this.add.text(50, 50, '');
        const bossText = this.add.text(630, 50, '');
        
        player.setDataEnabled();
        boss.setDataEnabled();
        
        console.log(currentChar)

        player.data.set('name', currentChar.character_name);
        player.data.set('class', currentChar.class);
        player.data.set('level', currentChar.level);
        player.data.set('attack', currentChar.level*2);
        player.data.set('hp', 12);
        
        boss.data.set('name', 'Dahlia');
        boss.data.set('level', 5);
        boss.data.set('attack', 1);
        boss.data.set('hp', 100);
        boss.data.set('defense', 2);
        
        //  Display it
        playerText.setText([
            'Name: ' + player.data.get('name'),
            'Level: ' + player.data.get('level'),
            'Attack: ' + player.data.get('attack'),
            'Hp: ' + player.data.get('hp')
        ]);

        bossText.setText([
            'Name: ' + boss.data.get('name'),
            'Level: ' + boss.data.get('level'),
            'Defense: ' + boss.data.get('defense'),
            'Hp: ' + boss.data.get('hp')
        ]);

        player.on('changedata', function (gameObject, key, value) {
            playerText.setText([
                'Name: ' + player.data.get('name'),
                'Level: ' + player.data.get('level'),
                'Attack: ' + player.data.get('attack'),
                'Hp: ' + player.data.get('hp')
            ]);

        });


        selectText = this.add.text(50, 480, 'SELECT:', { fontFamily: '"Press Start 2P"' });
        attackText = this.add.text(50, 505, 'ATTACK', { fontFamily: '"Press Start 2P"' }).setPadding(5).setInteractive();
        defendText = this.add.text(50, 545, 'DEFEND', { fontFamily: '"Press Start 2P"' }).setPadding(5);
        // text6 = this.add.text(220, 80, 'DEFEAT THE DAHLIA', { fontFamily: '"Press Start 2P', fontSize: '32px' })
        // text7 = this.add.text(400, 120, 'FIGHT!', { fontFamily: '"Press Start 2P', fontSize: '32px' })


        // Beginnings of code for click functions for attack and defend 
        attackText.on('pointerdown', function () {
            if (player.data.get('class') === 'mage') {
                console.log('damage dealt: ' + mageAttack(player.data.get('level'), boss.data.get('defense')))

            } else {
                console.log(warriorAttack(player.data.get('level'), boss.data.get('defense')))
            }
        })


        graphics = this.add.graphics();
    }
    update() {
        graphics.lineStyle(2, 0xffffff, 2);

        graphics.strokeRectShape(attackText.getBounds());
        graphics.strokeRectShape(defendText.getBounds());

        // Commented out character movement

        //     if (cursors.left.isDown)
        //     {
        //         player.setVelocityX(-160);

        //         player.anims.play('left', true);
        //     }
        //     else if (cursors.right.isDown)
        //     {
        //         player.setVelocityX(160);

        //         player.anims.play('right', true);
        //     }
        //     else
        //     {
        //         player.setVelocityX(0);

        //         player.anims.play('turn');
        //     }

        //     if (cursors.up.isDown && player.body.touching.down)
        //     {
        //         player.setVelocityY(-330);
        //     }
    }

}

export default Dahlias