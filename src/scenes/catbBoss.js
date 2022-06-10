import React, {useEffect} from 'react';
import Phaser from "phaser";
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
// import playGame from "../phaserGame"
import catBattle from "../assets/backgrounds/CatBossBackground.jpg"
import CatSprite from "../assets/characters/CatBoss2.png"
import bottom from "../assets/backgrounds/CatGround.jpg"
import { mageAttack, warriorAttack, dahliaAttack } from '../scripts/attack';

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
var currentChar;
var currentTurn;

class Cats extends Phaser.Scene {
    constructor() {
        super('Cats')
    }
    preload() {
        this.load.image('catBattle', catBattle);
        this.load.image('bottom', bottom)
        this.load.spritesheet('mage', mage, {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('CatSprite', CatSprite, {frameWidth: 129, frameHeight: 129});
    }
    create() {
        
        platforms = this.physics.add.staticGroup();
        
        platforms.create(400, 300, 'catBattle').setScale(1.5).refreshBody();
        platforms.create(400, 540, 'bottom').setScale(1.5).refreshBody();
        
        // platforms.create(400, 500, 'bossPlatform').setScale(4);
        
        player = this.physics.add.sprite(350, 100, 'mage');
        
        player.setCollideWorldBounds(true).setBounce(0.2).setScale(2);
        
         boss = this.physics.add.sprite(450, 100, 'CatSprite');

         boss.setCollideWorldBounds(true).setBounce(0.2);
        
        
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
        // let dahliaBossDefeated = false
        this.input.keyboard.on('keydown-R', () => {
            // console.log('R button pressed');
            this.scene.switch('Mains')
        }, this);
        
        // collider only takes in two parameters
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(boss, platforms);
        
        const playerText = this.add.text(50, 50, '');
        const bossText = this.add.text(630, 50, '');

        let currentTurn = 'player';
        
        player.setDataEnabled();
        boss.setDataEnabled();
        

        player.data.set('name', 'dog');
        player.data.set('class', 'mage');
        player.data.set('level', 2);
        player.data.set('attack', player.data.get('level')*2);
        player.data.set('hp', 20);
        
        boss.data.set('name', 'Cat');
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
        })

        const bossAttack = () => {
            const hp = boss.data.get('hp')
            // change to catAttack()
            let damage = dahliaAttack();
            player.data.set('hp', hp - damage);
            console.log(player.data.get('hp'))
            currentTurn = 'player';
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