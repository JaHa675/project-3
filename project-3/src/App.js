import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import About from './components/pages/About'
import Stats from './components/pages/Stats'
import BattleTrail from './components/pages/BattleTrail'
import Test from './components/pages/Test'


function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path ='/' element ={<Landing />}></Route>
  <Route path ='/login' element ={<Login />}></Route>
  <Route path ='/about' element ={<About />}></Route>
  <Route path ='/stats' element ={<Stats />}></Route>
  <Route path ='/game' element ={<BattleTrail />}></Route>
</Routes>
</BrowserRouter>
  )
}

export default App;
