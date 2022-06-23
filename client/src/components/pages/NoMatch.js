import React from 'react';
import '../../styles/NoMatch.css'
import logo from "../../assets/images/Battle_Trail_Gaming_Logo__AdobeCreativeCloudExpress.gif"
import gate from "../../assets/extras/stone-gate.png"


export default function NoMatch () {
    return (
        <div>
        <div className="container-lg" style={{height:"100%",display:"grid", justifyContent:"center"}}>
        <img className="stonearchway" src={gate} alt="archway"/>
        <div className="forbiddenmessage">
          <h1>403</h1>
          <h3>FORBIDDEN</h3>
        </div>
        </div>
      </div>
    );
}