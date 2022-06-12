import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame.js";
import mage from "../assets/characters/Mage.png"
import blBattle from "../assets/backgrounds/BrookeBackground.png"
import BrookeBoss from '../assets/characters/Brooke.png'
import brookeBottom from "../assets/backgrounds/BrookeGround.png"
import { mageAttack, warriorAttack, brookeAttack } from '../scripts/attack';
import eventsCenter from '../scripts/EventEmitter';

var player;
var platforms;
var cursors;
var boss;
var graphics;
var selectText;
var attackText;
var defendText;
var titleText;
var fightText;


class Brookes extends Phaser.Scene {
    constructor () {
        super('Brookes')
    }
    preload () {
        this.load.image('blBattle',blBattle)
        this.load.spritesheet('BrookeBoss',BrookeBoss,{frameWidth: 48, frameHeight: 48});
        this.load.image("brookeBottom", brookeBottom)
        this.load.spritesheet('mage', mage, {frameWidth: 48, frameHeight: 48});
    }
    create () {

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'blBattle').setScale(1.5).refreshBody();
        platforms.create(400, 480, 'brookeBottom').setScale(1.5).refreshBody();

        boss = this.physics.add.sprite(500, 200, 'BrookeBoss').setBounce(0.2).setCollideWorldBounds(true).setScale(2);
        // player.setCollideWorldBounds(true);
        player = this.physics.add.sprite(300, 200, 'mage').setBounce(0.2).setCollideWorldBounds(true).setScale(2);

        cursors = this.input.keyboard.createCursorKeys();
        // makes the boss touch the ground
        this.physics.add.collider(boss, platforms);
        // this.physics.add.collider(boss, brookeBottom);

        // makes the boss touch the ground
        this.physics.add.collider(player, platforms);
        // this.physics.add.collider(player, brookeBottom);
        // console.log(currentChar)

            // Scene change handler currently on key, needs to be onClick or bound condtionally
        //  Please leave console logs for testing purposes as the game grows
        cursors = this.input.keyboard.createCursorKeys();

        let BrookeBossDefeated = false
        this.input.keyboard.on('keydown-R', () => {
            // console.log('R button pressed');
            this.scene.switch('Mains')
        }, this);

        // collider only takes in two parameters
        this.physics.add.collider(player, brookeBottom);
        this.physics.add.collider(boss, brookeBottom);
        // this.physics.add.collider(player, platforms);
        // this.physics.add.collider(boss, platforms);

        const playerText = this.add.text(50, 50, '');
        const bossText = this.add.text(630, 50, '');

        let currentTurn = 'player';

        player.setDataEnabled();
        boss.setDataEnabled();

        

        // console.log(currentChar)

        player.data.set('name', 'dog');
        player.data.set('class', 'mage');
        player.data.set('level', 2);
        player.data.set('attack', player.data.get('level') * 2);
        player.data.set('hp', 20);

        boss.data.set('name', 'Brooke');
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
        titleText = this.add.text(250, 80, 'CAN YOU DEFEAT THE BROOKE', { fontFamily: '"Press Start 2P', fontSize: '12px' })
        fightText = this.add.text(360, 120, 'FIGHT!', { fontFamily: '"Press Start 2P', fontSize: '12px' })


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
                let damage = brookeAttack();
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
    }

    }

    export default Brookes 