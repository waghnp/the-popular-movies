import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Banner extends Component {
  render() {
    const moviesList = movies.results[0]

    return (
      <>
            {
                moviesList===[]?
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                :
                <div className="card banner-card" >
                    <img src={`https://image.tmdb.org/t/p/original${moviesList.backdrop_path}`} className="card-img-top banner-img" alt={moviesList.title}/>
                    {/* <div className="card-body"> */}
                        <h1 className="card-title banner-title">{moviesList.original_title}</h1>
                        <p className="card-text banner-text">{moviesList.overview}</p>
                        {/* <a  className="btn btn-primary">Go somewhere</a> */}
                    {/* </div> */}
                </div>
            }

      </>
    )
  }
}
