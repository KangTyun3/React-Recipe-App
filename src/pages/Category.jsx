import React from 'react'
import Navbar from '../components/Navbar'
import Cuisine from './Cuisine'
import {NavLink,BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Search from '../components/Search'
import Searched from './Searched'
import Recipe from './Recipe'
function Category() {
  return (
      <div>
      <Router>
        <Search/>
              <Navbar/>
              <Routes>
                  <Route path="/" element={ <Home/>} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path='/searched/:name' element={<Searched />} />
          <Route path='/recipe/:id' element={<Recipe/>} />
        </Routes>
          </Router>
               
       
          
    </div>
  )
}

export default Category