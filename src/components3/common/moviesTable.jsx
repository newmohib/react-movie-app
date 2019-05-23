import React, { Component } from 'react';
import  Like  from "./like";
class MoviesTable extends Component {
    state = {  }
    render() {
        const {movies}=this.props.movies;
        return ( 
            <React.Fragment>
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
                        {this.props.movies.map(movie =>
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalTate}</td>
                                <td>{movie.PublishDate}</td>
                                <td><Like  onClick={() => this.props.onLikeClick(movie)} liked={() => this.props.liked(movie.liked)}/></td>
                                <td><button onClick={() => this.props.onDeleteClick(movie)} className="btn btn-info btn-sm">Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </React.Fragment>
         );
    }
}
 
export default MoviesTable;