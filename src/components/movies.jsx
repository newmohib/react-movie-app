
import React, { Component } from 'react';
import { getMovies } from "../jsonData/moviesData";
import  Like  from "./common/like";
class Movies extends Component {
    state = {
        movies: getMovies()
    };
    handleLike = (movie) => {
        const movies=[...this.state.movies];
        const index=movies.indexOf(movie);
        movies[index].liked= !movies[index].liked;
        console.log("like" , movie);
        this.setState({ movies: movies });
    }
    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m.id !== movie.id);
        this.setState({ movies: movies });
    }

    render() {
        const { length: count } = this.state.movies;
        if (count === 0) { return <p>There are no movies in the database.</p> }
        return (
            <React.Fragment>
                <p>Showing {count} movies in the Database</p>
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
                        {this.state.movies.map(movie =>
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
            </React.Fragment>
        );
    }
}

export default Movies;