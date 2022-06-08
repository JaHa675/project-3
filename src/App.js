import React, {useState, useEffect} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import About from './components/pages/About'
import Stats from './components/pages/Stats'
import PlayerSelect from './components/pages/PlayerSelect'
import Brooke from './scenes/brookeBoss'
import CatBoss from './scenes/catbBoss'
import Dahlia from './scenes/dahliaBoss'
import James from './scenes/jamesBoss'
import Lucas from './scenes/lucasBoss'
import Main from './scenes/main'
import House from './scenes/playerHouse'
import Credits from './scenes/credits'
import Config from './scenes/config'
import API from './utils/API'


function App() {
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
      }
    })
  }
  const handleSignupSubmit=signupData =>{
    API.signup(signupData).then(data=>{
      if(data.token){
        setToken(data.token)
        localStorage.setItem("token",data.token)
      }
    })
  }
  return (
    <BrowserRouter>
<Routes>
  <Route path ='/' element ={<Landing />}></Route>
  <Route path ='/login' element ={<Login login={handleLoginSubmit} signup={handleSignupSubmit} />}></Route>
  <Route path ='/about' element ={<About />}></Route>
  <Route path ='/stats' element ={<Stats />}></Route>
  <Route path ='/newplayer' element ={<PlayerSelect />}></Route>
  <Route path ='/brooke' element ={<Brooke />}></Route>
  <Route path ='/catboss' element ={<CatBoss />}></Route>
  <Route path ='/dahlia' element ={<Dahlia />}></Route>
  <Route path ='/james' element ={<James />}></Route>
  <Route path ='/lucas' element ={<Lucas/>}></Route>
  <Route path ='/main' element ={<Config />}></Route>
  <Route path ='/house' element ={<House />}></Route>
  <Route path ='/credits' element ={<Credits />}></Route>
</Routes>
</BrowserRouter>
  )
}

export default App;
