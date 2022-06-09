import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame.js";
import mage from "../assets/characters/Mage.png"
import blBattle from "../assets/backgrounds/BattleOption8.jpg"
import BrookeBoss from '../assets/characters/Brooke.png'
import ground from "../assets/backgrounds/BattleOption4ground.png"
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
var playerText;
var bossText;
var currentTurn;


class Brookes extends Phaser.Scene {
    constructor () {
        super('Brookes')
    }
    preload () {
        this.load.image('blBattle',blBattle)
        this.load.spritesheet('BrookeBoss',BrookeBoss,{frameWidth: 48, frameHeight: 48});
        this.load.image("ground", ground)
        this.load.spritesheet('mage', mage, {frameWidth: 48, frameHeight: 48});
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
        

        boss = this.physics.add.sprite(500, 450, 'BrookeBoss').setBounce(0.2).setCollideWorldBounds(true).setScale(2);
        // player.setCollideWorldBounds(true);
        player = this.physics.add.sprite(200, 450, 'mage').setBounce(0.2).setCollideWorldBounds(true).setScale(2);

        cursors = this.input.keyboard.createCursorKeys();
        // makes the boss touch the ground
        this.physics.add.collider(boss, platforms);
        this.physics.add.collider(boss, ground);

        // makes the boss touch the ground
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, ground);
        // console.log(currentChar)

        player.data.set('name', 'dog');
        player.data.set('class', 'mage');
        player.data.set('level', 2);
        player.data.set('attack', player.data.get('level')*2);
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
        // text6 = this.add.text(220, 80, 'DEFEAT THE DAHLIA', { fontFamily: '"Press Start 2P', fontSize: '32px' })
        // text7 = this.add.text(400, 120, 'FIGHT!', { fontFamily: '"Press Start 2P', fontSize: '32px' })


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
            //  else {
            //     console.log(warriorAttack(player.data.get('level'), boss.data.get('defense')))
            // }
        })

        const bossAttack = () => {
            const hp = boss.data.get('hp')
            let damage = dahliaAttack();
            player.data.set('hp', hp - damage);
            console.log(player.data.get('hp'))
            currentTurn = 'player';
        }

        graphics = this.add.graphics();
    }
     update ()
    {
        graphics.lineStyle(2, 0xffffff, 2);

        graphics.strokeRectShape(attackText.getBounds());
        graphics.strokeRectShape(defendText.getBounds());
    }

    }

    export default Brookes 