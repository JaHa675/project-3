import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import playerbg from "../assets/backgrounds/PotionShop.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import mageBattlePos from "../assets/characters/MageBattlePositions.png"
import warriorBattlePos from "../assets/characters/WarriorBattlePositions.png"


var player;
var platforms;
var cursors;

class Players extends Phaser.Scene {
    constructor () {
        super('Players')
    }
    preload () {
        this.load.image('playerbg',playerbg);

        this.load.spritesheet('mage',mage,{
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('warrior',warrior,{
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('mageBattlePos',mageBattlePos,{
            frameWidth: 48, frameHeight: 48
        });
        this.load.spritesheet('warriorBattlesPos',warriorBattlePos,{
            frameWidth: 48, frameHeight: 48
        });
    }
    create () {
        // const warriors = this.add.spritesheet('warrior');
        // const warriorBattle = this.add.spritesheet('warriorBattlePos');
        // const mageBattle = this.add.spritesheet('mageBattlePos');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'playerbg').refreshBody();
        // .setScale(2) - option for images. Scales the size

        // platforms.create(600, 400, 'playerbg');
        // platforms.create(50, 250, 'playerbg');
        // platforms.create(750, 220, 'playerbg');

        player = this.physics.add.sprite(100, 450, 'mage');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mage', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'mage', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mage', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);
    }
     update ()
    {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }

    }



export default function PlayerSelect(props) {
    var game = null;
    
    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: Players
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}


