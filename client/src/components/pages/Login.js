import React, {useEffect} from 'react';
import '../../styles/Login.css'
// creating a functioning page
import { Button, Modal, Form} from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import UserInfo from '../../scripts/signup';
// import UserLoginInfo from '../../scripts/login'


export default function Login (props) {
    useEffect(()=>{
        const savedToken = localStorage.getItem("token");
        if(savedToken){
          window.location= "/main"
        }
      },[])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loginData, setLoginData] = useState({
        user_name:"",
        password:""
    })

    const [signupData, setSignupData] = useState({
        user_name:"",
        password:""
    })

    const loginSubmit = e=>{
        e.preventDefault();
        props.login(loginData)
        setLoginData({
            user_name:"",
            password:""
        })
    }

    const signupSubmit = e=>{
        e.preventDefault();
        props.signup(signupData)
        setSignupData({
            user_name:"",
            password:""
        })
        window.location= "/main"
    }

    const handleModalChangeName  = e => {
        setSignupData({...signupData,user_name:e.target.value})
     }
     const handleModalChangePassword  = e => {
        setSignupData({...signupData,password:e.target.value})
     }

  
        return (
            <div className="loginContainer">
                <div className="contentContainer">
                <div className='scrollImage'></div>
                    <h1 className= "loginPage subHeaders" style={{fontSize: "40px"}} >Login</h1>
                    <br></br>
                    <p className='subHeaders'>Please Login to Battle!</p>
                    <br></br>
                    <form action="#" method="post" id="loginOut">
                    <p className='subHeaders'>Battle Name</p>
                    <input value={loginData.user_name} name="loginUsername" type="text" placeholder="Your Battle Name Here" id="battleNameInput" onChange={(e)=>setLoginData({...loginData,user_name:e.target.value})} className="loginInput" required></input>
                    <br></br>
                    <p className='subHeaders'>Password</p>
                    <input value={loginData.password} name="loginPassword"  type="password" placeholder="Your Password Here" onChange={(e)=>setLoginData({...loginData,password:e.target.value})} id="passwordInput" className="loginInput" required></input>
                    <br></br>
                    {/* <input type="submit" value="Play Now" id="form_button" className="playNow centerBTN moveUp"/> */}
                    <Button variant="dark" onClick={loginSubmit}  className="playNow centerBTN" style={{padding: "20px"}}><a href='/main'>Play Now</a></Button>
                    <Button variant="dark" onClick={handleShow} className="playNow centerBTN moveUp openModal" style={{margin: "10px"}}>Sign Up</Button>
                    </form>
                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Label >Battle Name</Form.Label>
                        <Form.Control name="signupUsername" value={signupData.user_name} as='textarea' id="characterName"  onChange={handleModalChangeName} rows={1} style = {{resize: "none"}}/>
                        <br></br>
                    {/* <Form.Label>Email</Form.Label>
                        <Form.Control as='textarea' id="newEmail" rows={1} style = {{resize: "none"}}/>
                        <br></br> */}
                    <Form.Label>Password</Form.Label>
                        <Form.Control name="signupPassword" value={signupData.password} as='textarea' id="newPassword" type="password" onChange={handleModalChangePassword} rows={1} style = {{resize: "none"}}/>
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="signUpBTN">
                     <a href='/main'> <Button variant="dark" className="playNow" style={{padding: "10px"}} onClick={signupSubmit}>Submit</Button></a>

                    </div>
                    </Modal.Footer>
                </Modal>
                </div>
            </div>
            
        );
}

