import React, { Component } from 'react'
// import { movies } from './getMovies'

export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currGenre:'All Genres',
            moviesList:[],
            currSearchedText : '',
            limit:5,
            currPage:1
        }
    }
    handleGenreChange=(genre)=>{
        this.setState({
            currGenre:genre
        })
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        
        let favouritesList = JSON.parse(localStorage.getItem("movies-app") || "[]");
        let temp = []
        favouritesList.forEach(movie=>{
            if(!temp.includes(genreids[movie.genre_ids[0]])){
                temp.push(genreids[movie.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres")
        this.setState({
            moviesList:[...favouritesList],
            genres : [...temp]
        })
    }
    sortPopularityDesc=()=>{
        let temp = this.state.moviesList;

        temp.sort(function(a,b){
            return b.popularity-a.popularity
        })

        this.setState({
            moviesList:[...temp]
        })
    }

    sortPopularityAsc=()=>{
        let temp = this.state.moviesList;

        temp.sort(function(a,b){
            return a.popularity-b.popularity
        })

        this.setState({
            moviesList:[...temp]
        })
    }

    sortRatingDesc=()=>{
        let temp = this.state.moviesList;

        temp.sort(function(a,b){
            return b.vote_average-a.vote_average
        })

        this.setState({
            moviesList:[...temp]
        })
    }

    sortRatingAsc=()=>{
        let temp = this.state.moviesList;

        temp.sort(function(a,b){
            return a.vote_average-b.vote_average
        })

        this.setState({
            moviesList:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDelete=(id)=>{
        console.log("Delete button clicked for ",id)
        let filterArr = this.state.moviesList.filter(movie=>movie.id!==id);
        this.setState({
            moviesList:[...filterArr]
        })

        localStorage.setItem("movies-app",JSON.stringify(filterArr));
    }
  render() {

    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let filterMoviesAccToGen = []
    if(this.state.currSearchedText===''){
        filterMoviesAccToGen = this.state.moviesList
    }else{
        filterMoviesAccToGen = this.state.moviesList.filter(movie=>{
            let movieTitle = movie.original_title.toLowerCase();
            return movieTitle.includes(this.state.currSearchedText.toLowerCase())
        })
    }
    if(this.state.currGenre!=='All Genres'){
        filterMoviesAccToGen = this.state.moviesList.filter(movie=>genreids[movie.genre_ids[0]]===this.state.currGenre)
    }

    let pages = Math.ceil(filterMoviesAccToGen.length/this.state.limit);
    let pagesArr = [];
    for(let i=1;i<=pages;i++)
        pagesArr.push(i);
    let si = (this.state.currPage-1)*this.state.limit;
    let ei = si+this.state.limit;

    filterMoviesAccToGen = filterMoviesAccToGen.slice(si,ei);

    return (
      <div>
        <>
            <div className='row'>
                <div className='col-lg-3 col-sm-12'>
                    <ul className="list-group favourites-genres">
                        {
                            this.state.genres.map(genre=>(
                                this.state.currGenre === genre?
                                <li key={genre} style={{background:'#3f51b5',fontWeight:'bold',color:'whitesmoke'}} className="list-group-item">{genre}</li>:
                                <li key={genre} onClick={()=>this.handleGenreChange(genre)} style={{background:'white',fontWeight:'bold',color:'#3f51b5'}} className="list-group-item">{genre}</li>
                            ))
                        }
                        
                    </ul>
                </div>
                <div className='col-lg-9 col-sm-12 favourites-table'>
                    <div className='row'>
                        <input type='text' value={this.state.currSearchedText} onChange={(e)=>this.setState({currSearchedText:e.target.value})} placeholder="Search" className='input-group-text col'/>
                        <input type='number' className='input-group-text col' placeholder='Row Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}  />
                    </div>
                    <div className='row'>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i className="fa-solid fa-circle-up" onClick={this.sortPopularityDesc} /> Popularity <i className="fa-solid fa-circle-down" onClick={this.sortPopularityAsc}/></th>
                                <th scope="col"><i className="fa-solid fa-circle-up" onClick={this.sortRatingDesc} /> Rating <i className="fa-solid fa-circle-down" onClick={this.sortRatingAsc}/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterMoviesAccToGen.map((movie)=>(
                                        <tr key={movie.id}>
                                            {/* <th scope="row">1</th> */}
                                            <td><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}  alt={movie.title} style={{width:'5rem',marginRight:'0.5rem'}} />{movie.original_title}</td>   
                                            <td>{genreids[movie.genre_ids[0]]}</td>
                                            <td>{movie.popularity}</td>
                                            <td>{movie.vote_average}</td>
                                            <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movie.id)} >Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </table>
                    </div>
                        <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {
                                 pagesArr.map(page=>(
                                    <li key={page} className="page-item"><a className="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                 ))
                            }
                        </ul>
                        </nav>
                </div>
            </div>
        </>
      </div>
    )
  }
}
