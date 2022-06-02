import React from 'react';
import '../../styles/About.css'

export default function About () {
    return (
        <div>
                <div className='infoContainer'>
            <div className='aboutContainer'>
            <h1 className='aboutTitle'>Why We Did this?</h1>
            <div className='aboutParaContainer'>
                <h6 className='aboutUsPara'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </h6>
                <h6 className='aboutUsPara'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </h6>
            </div>
            </div>
            <div className='linksContainer'>
                <h4>Links to Our GitHub</h4>
                <ul className="githubLinks">
                    <li> <a href='https://github.com/brookelove'>Brooke</a> </li>
                    <li> <a href="https://github.com/DahliaGRV">Dahlia </a> </li>
                    <li> <a href='https://github.com/JaHa675'>James</a> </li>
                    <li> <a href='https://github.com/remotemana'>Lucas</a> </li>
                </ul>
            </div>
        </div>
        </div>
    );
}