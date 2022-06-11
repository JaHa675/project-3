import React, { useEffect } from 'react';
import Phaser from "phaser";
import BattleBackground from "../assets/backgrounds/DahliaBackground.png"
// import bossPlatform from "../assets/extras/TomatoPlatform.png"
import dahliaBoss from '../assets/characters/Dahlia.png'
import floor from '../assets/backgrounds/DahliaGround.png'
// import dahliaBattlePos from '../assets/characters/DahliaBattlePositions.png'
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
// import mageBattlePos from "../assets/characters/MageBattlePositions.png"
// import warriorBattlePos from "../assets/characters/WarriorBattlePositions.png"

import bridge from "../assets/extras/TomatoPlatform.png"
import { mageAttack, warriorAttack, dahliaAttack } from '../scripts/attack';
import { getOneCharacter } from '../utils/API';
import eventsCenter from '../scripts/EventEmitter';

// const currentChar = ;


var player;
var platforms;
var cursors;
var boss;
var graphics;
var selectText;
var attackText;
var defendText;
// var titleText;
// var fightText;


class Dahlias extends Phaser.Scene {
    constructor() {
        super('Dahlias')
    }
    preload() {
        this.load.image('BattleBackground', BattleBackground)
        this.load.image('bridge', bridge)
        this.load.image('floor', floor)
        this.load.spritesheet('mage', mage, {
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('dahliaBoss', dahliaBoss, {
            frameWidth: 48, frameHeight: 48
        });
    }
    create() {
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'BattleBackground').setScale(1.5).refreshBody();
        platforms.create(400, 470, 'floor').setScale(1.5);
        
        player = this.physics.add.sprite(350, 100, 'mage');
        player.setCollideWorldBounds(true).setBounce(0.2).setScale(2);
        
        boss = this.physics.add.sprite(450, 100, 'dahliaBoss');
        boss.setCollideWorldBounds(true).setScale(2).setBounce(0.2);
        
        
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
        // this.input.keyboard.on('keydown-R', () => {
        //     // console.log('R button pressed');
        //     this.scene.switch('Mains')
        // }, this);

        // collider only takes in two parameters
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(boss, platforms);

        const playerText = this.add.text(50, 50, '');
        const bossText = this.add.text(630, 50, '');

        let currentTurn = 'player';

        player.setDataEnabled();
        boss.setDataEnabled();

        // console.log(currentChar)

        player.data.set('name', 'dog');
        player.data.set('class', 'mage');
        player.data.set('level', 4);
        player.data.set('attack', player.data.get('level') * 2);
        player.data.set('hp', 20);

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

        boss.on('changedata', function (gameObject, key, value) {
            bossText.setText([
                'Name: ' + boss.data.get('name'),
                'Level: ' + boss.data.get('level'),
                'Defense: ' + boss.data.get('defense'),
                'Hp: ' + boss.data.get('hp')
            ]);
        });

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
        // titleText = this.add.text(220, 80, 'DEFEAT THE DAHLIA', { fontFamily: '"Press Start 2P', fontSize: '32px' })
        // fightText = this.add.text(400, 120, 'FIGHT!', { fontFamily: '"Press Start 2P', fontSize: '32px' })


        // Beginnings of code for click functions for attack and defend 
        attackText.on('pointerdown', function () {
            const hp = boss.data.get('hp')
            if (player.data.get('class') === 'mage') {
                let damage = mageAttack(player.data.get('level'), boss.data.get('defense'))
                boss.data.set('hp', hp - damage);
                eventsCenter.emit('playerAttack', damage)
                console.log(boss.data.get('hp'))

                // TODO: display damage dealt
                currentTurn = 'boss';
                bossAttack();
            }
            //  else {
            //     console.log(warriorAttack(player.data.get('level'), boss.data.get('defense')))
            // }
        })

        const bossAttack = () => {
            const hp = boss.data.get('hp')
            if (hp > 0) {
                let damage = dahliaAttack();
                eventsCenter.emit('bossAttack', damage)
                player.data.set('hp', player.data.get('hp') - damage);
                if (player.data.get('hp') < 1) {
                    boss.data.set('hp', 100);
                    player.data.set('hp', 20);
                    this.scene.switch('Mains')
                    this.scene.stop('BattleLog')
                }
                // TODO: make a display for damage dealt
                console.log(player.data.get('hp'))
                currentTurn = 'player';
            } else {
                // TODO: maybe give them a nice animation for leveling up
                eventsCenter.emit('dahlia-defeated')
                this.scene.switch('Mains')
            }
        }

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