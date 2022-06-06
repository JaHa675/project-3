import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { Scene } from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption5.png"
import bossPlatform from "../assets/extras/TomatoPlatform.png"
import dahliaBoss from '../assets/characters/Dahlia.png'
import test from "./dahliaBoss"
// import dahliaBattlePos from '../assets/characters/DahliaBattlePositions.png'
import warrior from "../assets/characters/Warrior.png"
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

class CharacterSelection extends Scene {
    constructor() {
        super('charSelect')
    }
    preload() {
        
        this.load.image('dgBattle', dgBattle)
        this.load.image('bridge', bridge)
        this.load.image('bossPlatform', bossPlatform)
        this.load.spritesheet('mage', mage, {
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('warrior', warrior, {
            frameWidth: 48, frameHeight: 48
        });
        
    }
    create() {
        // Phaser.Canvas.setImageRenderingCrisp(this.root.canvas)
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'dgBattle').refreshBody();

        platforms.create(400, 500, 'bossPlatform').setScale(3);

        player = this.physics.add.sprite(250, 300, 'mage').setScale(3);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        warrior = this.physics.add.sprite(550, 300, 'warrior').setScale(3);
        
        warrior.setBounce(0.2);
        warrior.setCollideWorldBounds(true);



        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('warrior', {start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        warrior.play('walk');



        // var cursors = this.input.keyboard.createCursorKeys();

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


             text4 =this.add.text(230, 190, 'MAGE', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text5 =this.add.text(500, 190, 'WARRIOR', { fontFamily: '"Press Start 2P"' }).setPadding(5);
             text6=this.add.text(120,80, 'CHARACTER SELECTION:',{fontFamily:'"Press Start 2P',fontSize:'32px'})

            graphics = this.add.graphics();

            cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.on('keydown-A', () => {
                this.scene.add('test', test, true, {x:800, y:600})
            }, this);
            
    }
     update ()
    {
        // 
        graphics.lineStyle(2, 0xffffff, 2);

        graphics.strokeRectShape(text4.getBounds());
        graphics.strokeRectShape(text5.getBounds());
        
    }
}
export default CharacterSelection;