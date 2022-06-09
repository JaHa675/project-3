import React, { useEffect } from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import jamesBattle from "../assets/backgrounds/BattleOption9.jpg"
import jamesBoss from "../assets/characters/James.png"
import ground from "../assets/backgrounds/BattleOption4ground.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import { mageAttack, warriorAttack, jamesAttack } from '../scripts/attack';
import { getOneCharacter } from '../utils/API';


const currentChar = getOneCharacter(1);


var player;
var platforms;
var cursors;
var boss;
var graphics;
var selectText;
var attackText;
var defendText;

class Jamess extends Phaser.Scene {
    constructor() {
        super('Jamess')
    }
    preload() {
        this.load.image('jamesBattle', jamesBattle)
        this.load.image('ground', ground)
        this.load.spritesheet('mage', mage, {
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('jamesBoss', jamesBoss, {
            frameWidth: 48, frameHeight: 48
        });

    }
    create() {

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'jamesBattle').refreshBody();

        player = this.physics.add.sprite(350, 100, 'mage').setScale(2);
        player.setCollideWorldBounds(true).setBounce(0.2);

        boss = this.physics.add.sprite(450, 100, 'jamesBoss').setScale(2);
        boss.setCollideWorldBounds(true).setBounce(0.2);

        // getting a ground to render on the bottom
        let groundX = this.sys.game.config.width / 3;
        let groundY = this.sys.game.config.height * .95;
        let ground = this.physics.add.image(groundX, groundY, "ground");
        ground.displayWidth = this.sys.game.config.width * 1.0;
        ground.setBounce(0);
        ground.setImmovable();
        ground.setCollideWorldBounds(true);


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

        let JamesBossDefeated = false
        this.input.keyboard.on('keydown-R', () => {
            // console.log('R button pressed');
            this.scene.switch('Mains')
        }, this);

        // collider only takes in two parameters
        this.physics.add.collider(player, ground);
        this.physics.add.collider(boss, ground);
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

        boss.data.set('name', 'James');
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
        // text6 = this.add.text(220, 80, 'DEFEAT THE JAMES', { fontFamily: '"Press Start 2P', fontSize: '32px' })
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
            let damage = jamesAttack();
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
// export default function James(props) {
//     var game = null;


//     useEffect((props) => {
//         const config = {
//             type: Phaser.AUTO,
//             parent: "phaser",
//             width: 800,
//             height: 600,
//             scene: Jamess
//         }
//         game = new Phaser.Game(config);
//     }, [])

//     return (
//         <div id="battle">{game ? game : ""}</div>

//     )

// }

export default Jamess