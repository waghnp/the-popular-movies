import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'15px'}}>
        <h1>The Movies</h1>
        <h2 style={{marginLeft:'25px',marginTop:'10px'}}>Favourites</h2>
      </div>
    )
  }
}
