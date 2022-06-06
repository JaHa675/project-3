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
import { mageAttack } from '../scripts/attack';

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

        player.setDataEnabled();

        player.data.set('name', 'player');
        player.data.set('class', 'mage');
        player.data.set('level', 2);
        player.data.set('attack', 150);
        player.data.set('hp', 12);
        
        //  Display it
        text.setText([
            'Name: ' + player.data.get('name'),
            'Level: ' + player.data.get('level'),
            'Attack: ' + player.data.get('attack'),
            'Hp: ' + player.data.get('hp')
        ]);

        text3 = this.add.text(50, 480, 'SELECT:', { fontFamily: '"Press Start 2P"'});
        text4 =this.add.text(50, 505, 'ATTACK', { fontFamily: '"Press Start 2P"' }).setPadding(5);
        text5 =this.add.text(50, 545, 'DEFEND', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text6=this.add.text(220,80, 'DEFEAT THE DAHLIA',{fontFamily:'"Press Start 2P',fontSize:'32px'})
             text7=this.add.text(400,120, 'FIGHT!',{fontFamily:'"Press Start 2P',fontSize:'32px'})
             
             graphics = this.add.graphics();
             
             boss.data.set('name', 'boss');
             boss.data.set('level', 213719);
             boss.data.set('attack', 1);
             boss.data.set('hp', 1174326874612398746123);
             boss.data.set('defense', 2);
       
             // Beginnings of code for click functions for attack and defend 
        this.input.on('pointerdown',function(){
             const hpPoints = player.data.get('bossAtkPoints')
             if (player.data.get('class')=== 'mage'){
                 console.log(mageAttack(player.data.get('level'),boss.data.get('defense')))
             }
        })
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