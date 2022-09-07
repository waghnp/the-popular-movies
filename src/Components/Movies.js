import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';
export default class Movies extends Component {
  constructor(){
    super();  
    this.state={
      hover:'',
      pagination:[1],
      currentPage:1,
      moviesList:[], 
      favourites:[]
    }
  }
  async componentDidMount(){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c8d857b14bc3a46e8b12d5aa3b8fcb0d&language=en-US&page=${this.state.currentPage}`);
    let data = res.data;
    this.setState({
      moviesList:[...data.results]
    })
  }

  changeMovies=async()=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c8d857b14bc3a46e8b12d5aa3b8fcb0d&language=en-US&page=${this.state.currentPage}`);
    let data = res.data;
    this.setState({
      moviesList:[...data.results]
    })
  }

  handleNext=()=>{
    if(this.state.currentPage<this.state.pagination.length){
      this.setState({
        currentPage:this.state.currentPage+1
      },this.changeMovies)
    }else{
      let tempArr=[];
      for(let i=1;i<=this.state.pagination.length+1;i++){
        tempArr.push(i);
      }
      this.setState({
        pagination:[...tempArr],
        currentPage:this.state.currentPage+1
      },this.changeMovies)
    }
  }

  handlePrev=()=>{
    if(this.state.currentPage!==1){
      this.setState({
        currentPage:this.state.currentPage-1
      },this.changeMovies)
    }
  }

  handleClick=(pageClicked)=>{
    if(pageClicked!==this.state.currentPage){
      this.setState({
        currentPage:pageClicked
      },this.changeMovies)
    }
  }
  handleFavourites=(movie)=>{
    let oldFavourites = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if(this.state.favourites.includes(movie.id)){
      oldFavourites = oldFavourites.filter(m => m.id !== movie.id);
    }else{
      oldFavourites.push(movie);
    }
    localStorage.setItem("movies-app",JSON.stringify(oldFavourites));
    console.log(oldFavourites);
    this.handleFavouritesState();
  }
  handleFavouritesState=()=>{
    let oldFavourites = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldFavourites.map(movie => movie.id);
    this.setState({
      favourites : [...temp]
    })
  }
  render() {
    // const moviesList = movies.results
    return (
      <>
        {
            this.state.moviesList===[]?
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            :
            <div>
              <h3 className="text-center" ><strong>Trending</strong></h3>
              <div className='movies-list'>
                  {
                      this.state.moviesList.map((movie) =>
                      <div key={movie.id } className="card movies-card" onMouseEnter={()=>this.setState({hover:movie.id})} onMouseLeave={()=>this.setState({hover:''})}>
                          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top movies-img" alt={movie.title}/>
                          {/* <div className="card-body"> */}
                              <h5 className="card-title movies-title">{movie.original_title}</h5>
                              {/* <p className="card-text banner-text">{movie.overview}</p> */}
                              <div className='button-wrapper'>
                                {
                                  this.state.hover===movie.id && <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movie)}>{this.state.favourites.includes(movie.id)?"Remove from favourites":"Add to favourites"}</ a>
                                }  
                              </div>
                          {/* </div> */}
                      </div>
                      )
                  }
              </div>
              <div className='movies-pagination'>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={this.handlePrev}>Previous</a></li>
                    {
                      this.state.pagination.map((value)=>
                        <li key={value} className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                      )
                    }
                    <li className="page-item"><a className="page-link" onClick={this.handleNext}>Next</a></li>
                  </ul>
                </nav>
              </div>
            </div>
        }
      </>
    )
  }
}
