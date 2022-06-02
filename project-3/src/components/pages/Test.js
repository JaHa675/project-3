import React from 'react';
import Phaser from "phaser";
import logoImg from "../../assets/backgrounds/wp8861921-anime-night-forest-wallpapers.jpg"

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.game = null;
        this.preload = () => {
            this.preload.image('logo', logoImg)
        }
        this.create = () => { 
            this.add.image(400, 250, 'logo')
        }
    }

    componentDidMount() {
        this.preload();
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
            create: this.create
        } )
    }

    render() {
        return (
            <div id='phaser'>hi</div>
        )
    }
}