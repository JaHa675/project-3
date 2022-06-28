import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame.js";
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
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
    init(data) {
        this.charClass = data.charClass;
        this.character_name = data.character_name;
        this.level = data.level;
    }
    preload () {
        this.load.image('blBattle',blBattle)
        this.load.spritesheet('BrookeBoss',BrookeBoss,
        {frameWidth: 48, frameHeight: 48});
        this.load.image("brookeBottom", brookeBottom)
        this.load.spritesheet('mage', mage,
         {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('warrior', warrior,
        { frameWidth: 48, frameHeight: 48 });
    }
    create () {

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'blBattle').setScale(1.5).refreshBody();
        platforms.create(400, 480, 'brookeBottom').setScale(1.5).refreshBody();

        player = this.physics.add.sprite(300, 100, `${this.charClass}`).setBounce(0.2).setCollideWorldBounds(true).setScale(2);

        boss = this.physics.add.sprite(500, 100, 'BrookeBoss').setBounce(0.2).setCollideWorldBounds(true).setScale(2);

        this.physics.add.collider(boss, platforms);
        this.physics.add.collider(player, platforms);

        cursors = this.input.keyboard.createCursorKeys();

            // Scene change handler currently on key, needs to be onClick or bound condtionally
        //  Please leave console logs for testing purposes as the game grows
        cursors = this.input.keyboard.createCursorKeys();

        player.setDataEnabled();
        boss.setDataEnabled();


        // collider only takes in two parameters
        this.physics.add.collider(player, brookeBottom);
        this.physics.add.collider(boss, brookeBottom);
        // this.physics.add.collider(player, platforms);
        // this.physics.add.collider(boss, platforms);

        const playerText = this.add.text(50, 50, '');
        const bossText = this.add.text(630, 50, '');

        let currentTurn = 'player';


        

        // console.log(currentChar)

        // player.data.set('name', 'Mage');
        // player.data.set('class', 'mage');
        // player.data.set('level', 2);
        // player.data.set('attack', player.data.get('level') * 2);
        // player.data.set('hp', 20);
        player.data.set('class', this.charClass);
        player.data.set('level', this.level);
        player.data.set('character_name', this.character_name);
        player.data.set('attack', player.data.get('level') * 2);
        player.data.set('hp', 20 * player.data.get('level'));


        boss.data.set('name', 'Dahlia');
        boss.data.set('level', 5 * player.data.get('level'));
        boss.data.set('attack', 2 * player.data.get('level'));
        boss.data.set('hp', 25 * player.data.get('level'));
        boss.data.set('defense', 2 * player.data.get('level'));

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

        
        // let BrookeBossDefeated = false

        this.input.keyboard.on('keydown-R', () => {
            // console.log('R button pressed');
            this.scene.start('Mains', { character_name: this.character_name, charClass: this.charClass, level: 1 })
            this.scene.stop('BattleLog')
        }, this);


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
                let damage = brookeAttack();
                eventsCenter.emit('bossAttack', damage)
                player.data.set('hp', player.data.get('hp') - damage);
                if (player.data.get('hp') < 1) {
                    boss.data.set('hp', 100);
                    player.data.set('hp', 20);
                    this.scene.start('Mains', { character_name: this.character_name, charClass: this.charClass, level: player.data.get('level') })
                    this.scene.stop('BattleLog')
                    this.scene.stop('Brookes')
                }
                // TODO: make a display for damage dealt
                console.log(player.data.get('hp'))
                currentTurn = 'player';
            } else {
                // TODO: maybe give them a nice animation for leveling up
                eventsCenter.emit('brooke-defeated')
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

    export default Brookes 