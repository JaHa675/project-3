import React, { useEffect } from 'react';
import Phaser from "phaser";
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
// import playGame from "../phaserGame"
import catBattle from "../assets/backgrounds/CatBossBackground.jpg"
import CatSprite from "../assets/characters/CatBoss2.png"
import bottom from "../assets/backgrounds/CatGround.jpg"
import { mageAttack, warriorAttack, catAttack } from '../scripts/attack';
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

class Cats extends Phaser.Scene {
    constructor() {
        super('Cats')
    }
    init(data) {
        this.charClass = data.charClass;
        this.character_name = data.character_name;
        this.level = data.level;
    }
    preload() {
        this.load.image('catBattle', catBattle);
        this.load.image('bottom', bottom)
        this.load.spritesheet('mage', mage,
            { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior', warrior,
            { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('CatSprite', CatSprite,
            { frameWidth: 129, frameHeight: 129 });
    }
    create() {

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'catBattle').setScale(1.5).refreshBody();
        platforms.create(400, 540, 'bottom').setScale(1.5).refreshBody();

        // platforms.create(400, 500, 'bossPlatform').setScale(4);

        // player = this.physics.add.sprite(350, 100, 'mage');
        // player.setCollideWorldBounds(true).setBounce(0.2).setScale(2);
        player = this.physics.add.sprite(350, 100, `${this.charClass}`).setScale(2);
        player.setBounce(0.2).setCollideWorldBounds(true);

        boss = this.physics.add.sprite(475, 100, 'CatSprite');
        boss.setCollideWorldBounds(true).setBounce(0.2);

        // collider only takes in two parameters
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(boss, platforms);


        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('mage', { start: 4, end: 5 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [{ key: 'mage', frame: 4 }],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('mage', { start: 6, end: 7 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // Scene change handler currently on key, needs to be onClick or bound condtionally
        //  Please leave console logs for testing purposes as the game grows
        cursors = this.input.keyboard.createCursorKeys();
        // let dahliaBossDefeated = false

        player.setDataEnabled();
        boss.setDataEnabled();

        const playerText = this.add.text(50, 50, '');
        const bossText = this.add.text(630, 50, '');

        let currentTurn = 'player';


        // player.data.set('name', 'Mage');
        // player.data.set('class', 'mage');
        // player.data.set('level', 2);
        // player.data.set('attack', player.data.get('level')*2);
        // player.data.set('hp', 20);
        player.data.set('class', this.charClass);
        player.data.set('level', this.level);
        player.data.set('character_name', this.character_name);
        player.data.set('attack', player.data.get('level') * 2);
        player.data.set('hp', 20);


        boss.data.set('name', 'Cat');
        boss.data.set('level', 5);
        boss.data.set('attack', 1);
        boss.data.set('hp', 100);
        boss.data.set('defense', 2);

        //  Display it
        playerText.setText([
            'Name: ' + player.data.get('character_name'),
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
                'Name: ' + player.data.get('character_name'),
                'Level: ' + player.data.get('level'),
                'Attack: ' + player.data.get('attack'),
                'Hp: ' + player.data.get('hp')
            ]);

        });

        this.input.keyboard.on('keydown-R', () => {
            // console.log('R button pressed');
            this.scene.start('Mains', { character_name: this.character_name, charClass: this.charClass, level: 1 })
            this.scene.stop('BattleLog')
        }, this);


        selectText = this.add.text(50, 480, 'SELECT:', { fontFamily: '"Press Start 2P"' });
        attackText = this.add.text(50, 505, 'ATTACK', { fontFamily: '"Press Start 2P"' }).setPadding(5).setInteractive();
        defendText = this.add.text(50, 545, 'DEFEND', { fontFamily: '"Press Start 2P"' }).setPadding(5);
        titleText = this.add.text(250, 80, 'CAN YOU DEFEAT THE CAT', { fontFamily: '"Press Start 2P', fontSize: '12px' })
        fightText = this.add.text(360, 120, 'FIGHT!', { fontFamily: '"Press Start 2P', fontSize: '12px' })


        // Beginnings of code for click functions for attack and defend 
        attackText.on('pointerdown', function () {
            const hp = boss.data.get('hp')
            if (player.data.get('class') === 'mage') {
                let damage = mageAttack(player.data.get('level'), boss.data.get('defense'))
                boss.data.set('hp', hp - damage);
                console.log(boss.data.get('hp'))
                currentTurn = 'boss';
                bossAttack();
            }
            else {
                let damage = warriorAttack(player.data.get('level'), boss.data.get('defense'))
                boss.data.set('hp', hp - damage);
                eventsCenter.emit('playerAttack', damage)
                console.log(boss.data.get('hp'))

                // TODO: display damage dealt
                currentTurn = 'boss';
                bossAttack();

            }
        })

        const bossAttack = () => {
            const hp = boss.data.get('hp')
            if (hp > 0) {
                let damage = catAttack();
                eventsCenter.emit('bossAttack', damage)
                player.data.set('hp', player.data.get('hp') - damage);
                if (player.data.get('hp') < 1) {
                    boss.data.set('hp', 100);
                    player.data.set('hp', 20);
                    this.scene.start('Credits', { character_name: this.character_name, charClass: this.charClass, level: 1 })
                    this.scene.sleep('BattleLog')
                }
                // TODO: make a display for damage dealt
                console.log(player.data.get('hp'))
                currentTurn = 'player';
            } else {
                // TODO: maybe give them a nice animation for leveling up
                eventsCenter.emit('cat-defeated')
                this.scene.start('Mains', { character_name: this.character_name, charClass: this.charClass, level: 1 })
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

export default Cats