import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import About from './components/pages/About'
import Stats from './components/pages/Stats'


function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path ='/' element ={<Landing />}></Route>
  <Route path ='/login' element ={<Login />}></Route>
  <Route path ='/about' element ={<About />}></Route>
  <Route path ='/stats' element ={<Stats />}></Route>
</Routes>
</BrowserRouter>
  )
}

export default App;
