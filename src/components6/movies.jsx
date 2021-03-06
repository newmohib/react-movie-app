
import React, { Component } from 'react';
import { getMovies } from "../jsonData/moviesData";
import  MoviesTable  from "./common/moviesTable";
import  Pagination  from "./common/pagination";
import  ListGroup  from "./common/listGroup";
import  {paginate}  from "./utils/paginate";

import _ from 'lodash';

class Movies extends Component {
    state = {
        movies:[],
        currentPage:1,
        pageSize:3,
        genres:[],
        fixdMovies:[],
        sortColumn:{path:'id',order:'asc'}
        
    };

    //bultin fuction setStates for dom
    componentDidMount(){
        this.setState({movies:getMovies(),fixdMovies:getMovies()});
        const genres=getMovies().map(movie=>movie.genre);
        this.setState({genres:genres});
       // console.log(genres);
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
        }else{
            // const allGenres=genres.map(genre=>{
            //     if (genreName==genre.name) {
            //         return genre;
            //     }
            // })
           // const allGenresNew=allGenres.filter(genre=> genre !==undefined);

            this.setState({currentPage:1});
            const movies=this.state.fixdMovies.map(movie=>movie);
            const moviesNew=movies.filter(movie=> movie.genre.name===genreName);
            this.setState({movies:moviesNew});
        }
    }

     //sorting by headline
     handleSort=(sortColumn,path)=>{
        var {movies:allMovies} = this.state;
        var sortMovies=[];

        if (path==="title" || path==="genre.name" ) {
             sortMovies= _.orderBy(allMovies,[sortColumn.path],[sortColumn.order]);
        }else{
            if (sortColumn.order==="asc") {
                sortMovies = allMovies.sort((a, b) => a[sortColumn.path] - b[sortColumn.path]);
            }else{
                sortMovies = allMovies.sort((a, b) => b[sortColumn.path] - a[sortColumn.path]);
            }
        }
         this.setState({sortColumn:sortColumn,movies:sortMovies});
     };

    render() {
        const {currentPage,pageSize,movies:allMovies,sortColumn} = this.state;
        const count=this.state.movies.length;
        //for sort
        var sortMovies=[]
        if (sortColumn.path==="title" || sortColumn.path==="genre.name") {
             sortMovies= _.orderBy(allMovies,sortColumn.path,sortColumn.order);
        }else{
            if (sortColumn.order==="asc") {
                sortMovies = allMovies.sort((a, b) => a[sortColumn.path] - b[sortColumn.path]);
            }else{
                sortMovies = allMovies.sort((a, b) => b[sortColumn.path] - a[sortColumn.path]);
            }
        }
        //sort closs
        
        //this fuctin is import from utils/paginate;
        const movies=paginate(sortMovies,currentPage, pageSize);
        const  totlCount= movies.length;
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
                        <ListGroup
                         items={this.state.genres} 
                         onItemSelect={this.handleGenreSelect} 
                         ></ListGroup>
                    </div>
                    <div className="col">
                    <MoviesTable
                     movies={movies} 
                     onLike={this.handleLike} 
                     onDelete={this.handleDelete}
                     sortColumn={sortColumn}
                     onSort={this.handleSort}
                     ></MoviesTable>
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