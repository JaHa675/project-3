import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
// import Alert from 'react-bootstrap/Alert'
// import { Link } from "react-router-dom";



export default function NavBar() {
    // const [show, setShow] = useState(true);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // function LoginAlert() {
    //     const [show, setShow] = useState(true);
    //     return(
    //     <div>
    //     <Alert show={show} variant="success">
    //     <Alert.Heading>Exit the Game?!</Alert.Heading>
    //     <p>
    //      Saved data will be lost if you navigate out of game
    //     </p>
    //     <hr />
    //     <div className="d-flex justify-content-end">
    //       <Button onClick={() => setShow(false)} variant="outline-success">
    //         Nevermind
    //       </Button>
    //       <Link to="/login" >To Login</Link>
    //     </div>
    //   </Alert>
    //   {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
    //   </div>
    //   )
    
    //   }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" >
                <h1 className="text-light"> Battle Trail</h1>
                { document.location.pathname !== "/" && 
                <p className="nav-item " >
                    <Button variant="dark" style={{color:"#c89876"}}  onClick={()=> {window.location.href="/"}}> HomepPage</Button>
                </p>
                }
                { document.location.pathname !== "/login" && 
                <p className="nav-item " >
                    <Button variant="dark" style={{color:"#c89876"}} onClick={()=> {window.location.href="/login"}}> Login</Button>
                </p>
                }
                {   document.location.pathname !== "/main" &&
                    <p className="nav-item " >
                    <Button variant="dark" style={{color:"#c89876"}} onClick={()=> {window.location.href="/main"}}> Game</Button>
                </p>
                }
                { document.location.pathname !== "/about" && 
                <p className="nav-item " >
                    <Button variant="dark" style={{padding: "10px", color:"#c89876"}} onClick={()=> {window.location.href="/about"}}> About The Creators</Button>
                </p>
                }
            </nav>
            {/* <Alert show={show} variant="success">
        <Alert.Heading>Exit the Game?!</Alert.Heading>
        <p>
         Saved data will be lost if you navigate out of game
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleClose} variant="outline-success">
            Nevermind
          </Button>
          <Link to="/login" >To Login</Link>
        </div>
      </Alert> */}
        </div>
    );
}
