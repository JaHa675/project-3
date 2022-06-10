import Phaser from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption4.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import finalGround from "../assets/backgrounds/BattleOption4ground.png"
import door from "../assets/backgrounds/DoorsTrial1.png"
import Mains from "./main";

// base variables for the door
var player;
var platforms;
var cursors;
var finalDoors;

var firstPlayCat = true;
let catBossDefeated = false;
var firstPlayMain = true;
let mainBossDefeated = false;


class CatDoors extends Phaser.Scene {
    constructor () {
        super('CatDoors')
    }
    preload () {
        this.load.image('dgBattle',dgBattle)
        this.load.image('door', door)
        this.load.spritesheet('mage',mage,{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('warrior',warrior,{frameWidth: 48, frameHeight: 48});
        this.load.image("finalGround", finalGround)
    }
    create () {
        this.character ="";
        // create a background 
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'dgBattle').refreshBody();

        //creating the 2 doors 
        finalDoors = this.physics.add.staticGroup();
        let doorX = 250;
        for (let i=0; i < 2; i++) {
            var finalDoor = finalDoors.create(doorX, 440, 'door').refreshBody().setScale(1.3).setInteractive();
            finalDoor.on('pointerdown', function (pointer) {
                console.log("this");
                console.log(this);
                console.log("pointer");
                console.log(pointer);
                switch (this.x) {
                    case 250: 
                    {
                        CatRoom();
                        break;
                    }
                    // this number might be different in game
                    case 485:
                    {
                        MainRoom();
                        break;
                    }
                }
            })
            doorX += 235;
        }
            player = this.physics.add.sprite(350, 100, 'mage').setScale(2);
            // if(state.charClass === 'mage'){
            //     player = this.physics.add.sprite(350, 100, 'mage');
            // } else {
            //     player = this.physics.add.sprite(350, 100, 'warrior');
            // }
            
            player.setBounce(0.2);
            player.setCollideWorldBounds(true);
            
            // getting a ground to render on the bottom
            let finalGroundX = this.sys.game.config.width / 3;
            let finalGroundY = this.sys.game.config.height * .95;
            let finalGround = this.physics.add.image(finalGroundX, finalGroundY, "finalGround");
            finalGround.displayWidth = this.sys.game.config.width * 1.0;
            finalGround.setBounce(0);
            finalGround.setImmovable();
            finalGround.setCollideWorldBounds(true);

        // player changing to right left and center positions
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
        
            let CatRoom = () => {
                //   console.log(firstPlay, dahliaBossDefeated)
                 if (firstPlayCat !== false) {
                    firstPlayCat = false;
                     console.log("input A test",firstPlayCat);
                    this.scene.start ('Cats')
                 } else if (catBossDefeated === false && firstPlayCat === false ) {
                     console.log(catBossDefeated)
                     this.scene.switch('Cats')
                 } 
            };
            let MainRoom = () => {
                    this.scene.start('Mains')
            }

        this.physics.add.collider(player, finalGround);
    }
    update () {
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

export default CatDoors