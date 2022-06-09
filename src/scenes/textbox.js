import Phaser from "phaser";
import eventsCenter from '../scripts/EventEmitter';

const logs = ['','','','','']
class TextBox extends Phaser.Scene {
    constructor(){
        super('BattleLog')
    }
    preload () {
        // this.load.image('tomato', test)
    }

    create () {
        // platforms = this.physics.add.staticGroup();
        // platforms.create(400, 300, 'tomato').refreshBody();
        function logChangeHandler () {
            BattleLog1.setText(logs[0]);
            BattleLog2.setText(logs[1]);
            BattleLog3.setText(logs[2]);
            BattleLog4.setText(logs[3]);
            BattleLog5.setText(logs[4]);
        }
        const BattleLog1 = this.add.text(400,300, logs[0], {fontSize: '20px', fill: 'white'});
        const BattleLog2 = this.add.text(400,350, logs[0], {fontSize: '20px', fill: 'white'});
        const BattleLog3 = this.add.text(400,400, logs[0], {fontSize: '20px', fill: 'white'});
        const BattleLog4 = this.add.text(400,450, logs[0], {fontSize: '20px', fill: 'white'});
        const BattleLog5 = this.add.text(400,500, logs[0], {fontSize: '20px', fill: 'white'});
        eventsCenter.on('logChange', logChangeHandler,this);
        eventsCenter.on('playerAttack', this.playerAttackHandler,this);
        eventsCenter.on('bossAttack', this.bossAttackHandler,this);
    }
    playerAttackHandler(damage) {
        console.log(logs, "battle log")
        logs.unshift(`Player Deals ${damage}` );
        if (logs.length > 5) {
            logs.pop()
        }
        eventsCenter.emit('logChange')
        }
    bossAttackHandler(damage) {
        console.log(logs, "battle log")
        logs.unshift(`Boss Deals ${damage}` );
        if (logs.length > 5) {
            logs.pop()
        }
        eventsCenter.emit('logChange')
        }
    }
export default TextBox;
