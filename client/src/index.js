import React from "react";
import{createRoot} from "react-dom/client";
import App from "./App";
// import BattleTrail from './components/pages/BattleTrail'

// import Phaser from "phaser";
// import playGame from "./phaserGame"

// export const config = {
//     type: Phaser.AUTO,
//     parent: "phaser",2
//     width: 800,
//     height: 600,
//     scene: playGame
// }
// const game = new Phaser.Game(config);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home"/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

