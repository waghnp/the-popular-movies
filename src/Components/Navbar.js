import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'15px'}}>
       <Link to='/' style={{textDecoration:'none'}} > <h1>The Movies</h1> </Link>
        <Link to='/favourites' style={{textDecoration:'none'}} ><h2 style={{marginLeft:'25px',marginTop:'7px'}}>Favourites</h2></Link>
      </div>
    )
  }
}
