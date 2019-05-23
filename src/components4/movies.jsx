
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
     handleSort=(sortColumn)=>{
         //const{movies:allMovies} = this.state;
        //  var sortColumn=this.state.sortColumn;
        //  if (sortColumn.path===head) {
        //      sortColumn.order= sortColumn.order==="asc"?"desc":"asc";
        //  }else{
        //     sortColumn.path=head;
        //     sortColumn.order="asc";
        //  }

         this.setState({sortColumn:sortColumn});
         //const sortMovies= _.orderBy(allMovies,sortColumn.path,sortColumn.order);
         //sortMovies.sort(function(a, b){return a-b});
         //this.setState({movies:sortMovies});
       // console.log(head);
     };

    render() {
        const {currentPage,pageSize,movies:allMovies,sortColumn} = this.state;
        const count=this.state.movies.length;
        //const numArray = newsort.id.sort((a, b) => a - b)
        const sortMovies= _.orderBy(allMovies,sortColumn.path,sortColumn.order);
        //this fuctin is import from utils/paginate;
        const movies=paginate(sortMovies,currentPage,pageSize);
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