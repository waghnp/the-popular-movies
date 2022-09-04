import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currGenre:'All Genres'
        }
    }
  render() {
    const moviesList = movies.results;
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let temp = [];

    moviesList.forEach(movie=>{
        if(!temp.includes(genreids[movie.genre_ids[0]])){
            temp.push(genreids[movie.genre_ids[0]]);
        }
    })
    temp.unshift("All Genres")
    return (
      <div>
        <>
            <div className='row'>
                <div className='col-3'>
                    <ul className="list-group favourites-genres">
                        {
                            temp.map(genre=>(
                                this.state.currGenre === genre?
                                <li style={{background:'#3f51b5',fontWeight:'bold',color:'whitesmoke'}} className="list-group-item">{genre}</li>:
                                <li style={{background:'white',fontWeight:'bold',color:'#3f51b5'}} className="list-group-item">{genre}</li>
                            ))
                        }
                        
                    </ul>
                </div>
                <div className='col-9 favourites-table'>
                    <div className='row'>
                        <input type='text' className='input-group-text col'/>
                        <input type='number' className='input-group-text col'/>
                    </div>
                    <div className='row'>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Popularity</th>
                                <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    moviesList.map((movie)=>(
                                        <tr>
                                            {/* <th scope="row">1</th> */}
                                            <td><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}  alt={movie.title} style={{width:'5rem',marginRight:'0.5rem'}} />{movie.original_title}</td>   
                                            <td>{genreids[movie.genre_ids[0]]}</td>
                                            <td>{movie.popularity}</td>
                                            <td>{movie.vote_average}</td>
                                            <td><button type="button" className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </table>
                    </div>
                        <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                        </nav>
                </div>
            </div>
        </>
      </div>
    )
  }
}
