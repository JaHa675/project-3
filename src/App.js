import React from 'react'
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


function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path ='/' element ={<Landing />}></Route>
  <Route path ='/login' element ={<Login />}></Route>
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
