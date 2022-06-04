import React from 'react';
import '../../styles/Login.css'
// creating a functioning page
import { Button, Modal, Form} from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login (props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
        return (
            <div className="loginContainer">
                <div className="contentContainer">
                <div className='scrollImage'></div>
                    <h1 className= "loginPage subHeaders" style={{fontSize: "40px"}} >Login</h1>
                    <br></br>
                    <p className='subHeaders'>Please Login to Battle!</p>
                    <br></br>
                    <form action="#" method="post" id="loginOut">
                    <p className='subHeaders'>Email</p>
                    <input name="email" type="text" placeholder="Your Email Here"id="emailInput" className="loginInput" required></input>
                    <br></br>
                    <p className='subHeaders'>Password</p>
                    <input name="password" type="text" placeholder="Your Password Here" id="passwordInput" className="loginInput" required></input>
                    <br></br>
                    <div style={{display: "flex"}}>
                    <input type="submit" value="Play Now" id="form_button" className="playNow centerBTN"/>
                    <br></br>
                    <Button variant="dark" onClick={handleShow} className="playNow centerBTN" style={{margin: "20px"}}>Sign Up</Button>
                    </div>
                    </form>
                    <Modal {...props} show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Label >Battle Name</Form.Label>
                        <Form.Control as='textarea' rows={1} style = {{resize: "none"}}/>
                        <br></br>
                    <Form.Label>Email</Form.Label>
                        <Form.Control as='textarea' rows={1} style = {{resize: "none"}}/>
                        <br></br>
                    <Form.Label>Password</Form.Label>
                        <Form.Control as='textarea' rows={1} style = {{resize: "none"}}/>
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="signUpBTN">
                    <Button variant="dark" className="playNow" style={{padding: "10px"}}>Submit</Button>
                    </div>
                    </Modal.Footer>
                </Modal>
                </div>
            </div>
        );
}
