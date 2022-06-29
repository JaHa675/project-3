import React, {useState, useEffect} from 'react'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import About from './components/pages/About'
import NoMatch from './components/pages/NoMatch'
import Stats from './components/pages/Stats'
import Main from './scenes/main'
import Credits from './scenes/credits'
import Config from './scenes/config'
import API from './utils/API'


function App() {
  const shouldRedirect = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token,setToken] = useState(null)
  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
    if(savedToken){
      setToken(savedToken)
    }
  },[])
  useEffect(()=>{
   if(token){
      API.verify(token).then(userData=>{
        if(userData.userId){
          setIsLoggedIn(true);
          setUserId(userData.userId)
        } else {
          setIsLoggedIn(false);
          setUserId(null)
        }
      }) 
    }else {
      setIsLoggedIn(false);
      setUserId(null)
    }
  },[token])

  const handleLoginSubmit=loginData =>{
    console.log("handle login",loginData)
    API.login(loginData).then(data=>{
      if(data.token){
        setToken(data.token)
        localStorage.setItem("token",data.token)
        window.location= "/main"
      }
    })
  }
  const handleSignupSubmit=signupData =>{
    API.signup(signupData).then(data=>{
      if(data.token){
        setToken(data.token)
        localStorage.setItem("token",data.token)
        window.location= "/main"
      }
    })
  }
  return (
    <div>
  <BrowserRouter forceRefresh={true}>
    <Routes>
      <Route exact path ='/' element ={<Landing />}></Route>
      <Route exact path ='/login' element ={<Login login={handleLoginSubmit} signup={handleSignupSubmit} />}></Route>
      <Route exact path ='/about' element ={<About />}></Route>
      <Route exact path ='/stats' element ={<Stats />}></Route>
      <Route exact path ='/main' element ={<Config />}></Route>
      <Route exact path ='/credits' element ={<Credits />}></Route>
      <Route path="*" element={<NoMatch />}></Route>
    </Routes>
  </BrowserRouter>
</div>
  )
}

export default App;
