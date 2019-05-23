
import React, { Component } from 'react';
import { getMovies } from "../jsonData/moviesData";
import  Like  from "./common/like";
import  Pagination  from "./common/pagination";
import  ListGroup  from "./common/listGroup";
import  {paginate}  from "./utils/paginate";


class Movies extends Component {
    state = {
        movies:[],
        currentPage:1,
        pageSize:3,
        genres:[],
        fixdMovies:[]
        
    };
    //bultin fuction setStates for dom

    componentDidMount(){
        
        this.setState({movies:getMovies(),fixdMovies:getMovies()});
        const genres=getMovies().map(movie=>movie.genre);
        this.setState({genres:genres});
        console.log(genres);
    }
    
    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m.id !== movie.id);
        this.setState({ movies: movies });
    }
    handleLike = (movie) => {
        const movies=[...this.state.movies];
        const index=movies.indexOf(movie);
        movies[index].liked= !movies[index].liked;
        //console.log("like" , movie);
        this.setState({ movies: movies });
    }
    //pagination
    handlePageChange=(page)=>{
       this.setState({currentPage:page});
    };
    handleGenreSelect=(genres , genreName)=>{
        if (genreName==="All-Item") {
            const movies=this.state.fixdMovies.map(movie=>movie);
            //const moviesNew=movies.filter(movie=> movie.genre.name===genreName);
            this.setState({movies:movies});
            //this.setState({genres:genres});
           // console.log(movies);
        }else{
            // const allGenres=genres.map(genre=>{
            //     if (genreName==genre.name) {
            //         return genre;
            //     }
            // })

           // const allGenresNew=allGenres.filter(genre=> genre !==undefined);
            // console.log(allGenres);
            // console.log(allGenresNew);
            //const newGenres=this.state.fixdMovies.map(movie=>movie.genre);
            this.setState({currentPage:1});
            const movies=this.state.fixdMovies.map(movie=>movie);
            const moviesNew=movies.filter(movie=> movie.genre.name===genreName);
            this.setState({movies:moviesNew});
            console.log(moviesNew);
        }
    }

    render() {
        const {currentPage,pageSize,movies:allMovies} = this.state;
        const count=this.state.movies.length;
        
        //this fuctin is import from utils/paginate;
        const movies=paginate(allMovies,currentPage,pageSize);
        const  totlCount= movies.length;
        //console.log(totlCount);
        if (totlCount === 0) { return <strong>There are no movies in the database.</strong> };
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col text-center">
                    <h5>Showing {count} movies in the Database</h5>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-3 text-center">
                        <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect}></ListGroup>
                    </div>
                    <div className="col">
               
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th>Date</th>
                            <th>Like</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie =>
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalTate}</td>
                                <td>{movie.PublishDate}</td>
                                <td><Like  onClick={() => this.handleLike(movie)} liked={movie.liked}/></td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-info btn-sm">Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <Pagination
                    itemCount={count}
                    pageSize={pageSize} 
                    onPageChange={this.handlePageChange} 
                    currentPage={currentPage}
                    ></Pagination>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Movies;