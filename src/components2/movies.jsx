
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
        pageSize:3
        
    };
    //bultin fuction setStates for dom
    componentDidMount(){
        this.setState({movies:getMovies()})
        
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
    }

    render() {
        
        const {currentPage,pageSize,movies:allMovies} = this.state;
        const count=this.state.movies.length;
        
        //this fuctin is import from utils/paginate;
        const movies=paginate(allMovies,currentPage,pageSize);
        const  totlCount= movies.length;
        console.log(totlCount);
        if (totlCount === 0) { return <strong>There are no movies in the database.</strong> };
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-6">
                    <p><h5>Showing {totlCount} movies in the Database</h5></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <ListGroup></ListGroup>
                    </div>
                    <div className="col">
               
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
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