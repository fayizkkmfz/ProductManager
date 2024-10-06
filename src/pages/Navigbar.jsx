import React, { useContext } from 'react'
import { ProductsContext } from '../App'
import './nav.css'

function Navigbar() {
    const {NavHead}=useContext(ProductsContext)
  return (
    <div className='nav-bg'>
       <h1 className='main-heading'>{NavHead}</h1>
    </div>
  )
}

export default Navigbar