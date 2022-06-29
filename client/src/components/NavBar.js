import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";

function LoginAlert() {
    const [show, setShow] = useState(true);
    return(
    <div>
    <Alert show={show} variant="success">
    <Alert.Heading>Exit the Game?!</Alert.Heading>
    <p>
     Saved data will be lost if you navigate out of game
    </p>
    <hr />
    <div className="d-flex justify-content-end">
      <Button onClick={() => setShow(false)} variant="outline-success">
        Nevermind
      </Button>
      <Link to="/login" >To Login</Link>
    </div>
  </Alert>
  {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
  </div>
  )

  }

export default function NavBar() {

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" >
                <h1 className="text-light"> Battle Trail</h1>
                { document.location.pathname !== "/" && 
                <p className="nav-item " >
                    <Link to="/" >HomePage</Link>
                </p>
                }
                { document.location.pathname !== "/login" && 
                <p className="nav-item " ><Button  onClick={LoginAlert}>Login</Button> 
                </p>
                }
                {   document.location.pathname !== "/main" &&
                    <p className="nav-item " >
                    <Link to="/main" >Game</Link>
                </p>
                }
                { document.location.pathname !== "/about" && 
                <p className="nav-item ">
                    <Link to="/about" >About The Creators</Link>
                </p>
                }
            </nav>
        </div>
    );
}
