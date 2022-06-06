import React, { useEffect } from 'react';
import { Scene } from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption5.png"
import bossPlatform from "../assets/extras/TomatoPlatform.png"
import dahliaBoss from '../assets/characters/Dahlia.png'
// import dahliaBattlePos from '../assets/characters/DahliaBattlePositions.png'
import mage from "../assets/characters/Mage.png"
// import warrior from "../assets/characters/Warrior.png"
// import mageBattlePos from "../assets/characters/MageBattlePositions.png"
// import warriorBattlePos from "../assets/characters/WarriorBattlePositions.png"

import bridge from "../assets/extras/TomatoPlatform.png"

var player;
var platforms;
var cursors;
var boss;
var graphics;
var text3;
var text4;
var text5;
var text6;
var text7;

class Dahlias extends Scene {
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

        const text= this.add.text(50,50,'');
        const text2= this.add.text(20,20,'');

        const list = [ 'Battle Data:', '' ];
        player.setDataEnabled();

        player.on('setdata', function (gameObject, key, value) {
            list.push(key);
            text2.setText(list);
        });

        player.data.set('Name:', 'player username here');
        player.data.set('Level:', 2);
        player.data.set('AtkPoints:',100);
        player.data.set('HpPoints:',250);

        player.on('changedata', function (gameObject, key, value) {
            text.setText([
                'Name: ' + player.data.get('name'),
                'Level: ' + player.data.get('level'),
                'Atk Points: ' + player.data.get('atkPoints') + ' atkPoints',
                'HP Points: ' + player.data.get('hpPoints') - ' bossAtkPoints'
            ]);

        });

            text3 = this.add.text(50, 480, 'SELECT:', { fontFamily: '"Press Start 2P"'});
             text4 =this.add.text(50, 505, 'ATTACK', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text5 =this.add.text(50, 545, 'DEFEND', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text6=this.add.text(220,80, 'DEFEAT THE DAHLIA',{fontFamily:'"Press Start 2P',fontSize:'32px'})
             text7=this.add.text(400,120, 'FIGHT!',{fontFamily:'"Press Start 2P',fontSize:'32px'})

            graphics = this.add.graphics();
            


       
            // Beginnings of code for click functions for attack and defend 

        // this.input.on('pointerdown',function(){
        //      const hpPoints = player.data.get('bossAtkPoints')
        //      if ()
        // })
    }
     update ()
    {
        graphics.lineStyle(2, 0xffffff, 2);

        graphics.strokeRectShape(text4.getBounds());
        graphics.strokeRectShape(text5.getBounds());

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