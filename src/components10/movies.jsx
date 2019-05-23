
import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import { getMovies } from "../jsonData/moviesData";
import  MoviesTable  from "./common/moviesTable";
import  Pagination  from "./common/pagination";
import  ListGroup  from "./common/listGroup";
import  SearchBox  from "./form/searchBox";
import  {paginate}  from "./utils/paginate";
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies:[],
        currentPage:1,
        pageSize:3,
        genres:[],
        fixdMovies:[],
        sortColumn:{path:'title',order:'asc'},
        searchQuery:"",
        selectedGenre:null
        
    };
    //bultin fuction setStates for dom
    componentDidMount(){
        var sortMovies=getMovies();
        //console.log(sortMovies,'1');
        let {sortColumn}=this.state;
        if (sortColumn.path==="title" || sortColumn.path==="genre.name") {
             sortMovies=sortMovies.sort((a, b) => (a[sortColumn.path]  > b[sortColumn.path] ) ? 1 : -1);
            // console.log(sortMovies,'2',sortColumn.path);

        }else{
            if (sortColumn.order==="asc") {
                sortMovies = getMovies().sort((a, b) => a[sortColumn.path] - b[sortColumn.path]);
              //  console.log(sortMovies,'5');
            }else{
                sortMovies = getMovies().sort((a, b) => b[sortColumn.path] - a[sortColumn.path]);
               // console.log(sortMovies,'6');
            } 
        }

        this.setState({movies:sortMovies,fixdMovies:getMovies()});
        const genres=sortMovies.map(movie=>movie.genre);
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

           // this.setState({currentPage:1});
            const movies=this.state.fixdMovies.map(movie=>movie);
            const moviesNew=movies.filter(movie=> movie.genre.name===genreName);
            this.setState({movies:moviesNew,currentPage:1,searchQuery:''});
        }
    }

     //sorting by headline
     handleSort=(sortColumn,path)=>{
        const {movies:allMovies} = this.state;
        var sortMovies=[];

        if (path==="title" || path==="genre.name" ) {
             sortMovies= _.orderBy(allMovies,sortColumn.path,[sortColumn.order]);
             //console.log(sortColumn.path); 
        }else{
            if (sortColumn.order==="asc") {
                sortMovies = allMovies.sort((a, b) => a[sortColumn.path] - b[sortColumn.path]);
                //console.log(sortMovies,'2');
            }else{
                sortMovies = allMovies.sort((a, b) => b[sortColumn.path] - a[sortColumn.path]);
               // console.log(sortMovies,'3');
            }
        }
       // console.log(sortMovies);
       // console.log(allMovies);
         this.setState({sortColumn:sortColumn,movies:sortMovies});
     };

     getPagedData=()=>{
    //     const{
    //     movies,
    //     currentPage,
    //     pageSize,
    //     genres,
    //     sortColumn,
    //     searchQuery,
    //     selectedGenre,
    //     }=this.state;

    //     let filtered=movies;
    //     if(searchQuery){
    //         filtered=movies.filter(m=>m.title.toLowerCase().startWith(searchQuery.toLocaleLowerCase()));
    //     }else if(selectedGenre && selectedGenre._id){
    //         filtered=movies.filter(m=>m.genre._id===selectedGenre._id);
    //     }
    //    const sortMovies= _.orderBy(filtered,sortColumn.path,[sortColumn.order]);
    //    const paginateMovies=paginate(sortMovies,currentPage, pageSize);
    //    return {totalCount:filtered.length,data:paginateMovies};
    }

     handleSearch=(query)=>{
        // this.setState({searchQuery:query,currentPage:1});
        // this.getPagedData(query);
        // console.log(query);
     }
     

    render() {
        const {currentPage,pageSize,movies:allMovies,sortColumn,searchQuery} = this.state;
        const count=this.state.movies.length;
        //for sort
;
        //  const array = [10, 2, 33, 4, 5];
        // console.log( Math.max(...array));
        
        // var sortMovies=[]
        // if (sortColumn.path==="title" || sortColumn.path==="genre.name") {
        //      sortMovies= _.orderBy(allMovies,sortColumn.path,sortColumn.order);
        //      console.log(sortMovies,'4');
        // }else{
        //     if (sortColumn.order==="asc") {
        //         sortMovies = allMovies.sort((a, b) => a[sortColumn.path] - b[sortColumn.path]);
        //         console.log(sortMovies,'5');
        //     }else{
        //         sortMovies = allMovies.sort((a, b) => b[sortColumn.path] - a[sortColumn.path]);
        //         console.log(sortMovies,'6');
        //     } 
        // }
        //sort closs
        
        //this fuctin is import from utils/paginate;
        console.log(allMovies);
        const movies=paginate(allMovies,currentPage, pageSize);
        console.log(movies);
        const  totlCount= movies.length;
        if (totlCount === 0) { return <strong>There are no movies in the database.</strong> };
        return (
            <React.Fragment>
                <div className="row" style={{marginBottom:'20px'}}>
                    <div className="col-3 ">
                     <Link
                     to="/movies/new"
                     className="btn btn-primary"> Add New Movie</Link>
                    </div>
                    <div className="col-6">
                     <SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
                    </div>
                </div>
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