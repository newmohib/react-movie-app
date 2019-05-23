import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import  Like  from "./like";
//import  _  from "lodash";


class MoviesTable extends Component {
    
    raiseSort=(head)=>{
        const {sortColumn,movies}=this.props;
        if (sortColumn.path===head) {
            sortColumn.order= sortColumn.order==="asc"?"desc":"asc";

        }else{
           sortColumn.path=head;
           sortColumn.order="asc";
        }
        console.log('moviesTable maiseSort');
        console.log(sortColumn,head);
        this.props.onSort(sortColumn,head);
    };
    //icon fuction
    renderSortIcon=columnHead=>{
        const {sortColumn}=this.props;
        if (columnHead!==sortColumn.path) {
            return null;
        }else if (sortColumn.order==="asc") {
            return <i className="fa fa-sort-asc" aria-hidden="true"></i>
        }else{
            return <i className="fa fa-sort-desc" aria-hidden="true"></i>
        }
    }

    render() { 
        const {movies, onDelete, onLike}=this.props;
        return ( 
           <table className="table">
           <thead>
               <tr style={{cursor:"pointer"}}>
                   <th  onClick={()=>this.raiseSort("id")}>ID {this.renderSortIcon("id")} </th>
                   <th onClick={()=>this.raiseSort("title")}>Title {this.renderSortIcon("title")}</th>
                   <th onClick={()=>this.raiseSort("genre.name")}>Type {this.renderSortIcon("genre.name")}</th>
                   <th onClick={()=>this.raiseSort("numberInStock")}>Stock {this.renderSortIcon("numberInStock")}</th>
                   <th onClick={()=>this.raiseSort("dailyRentalTate")}>Rate {this.renderSortIcon("dailyRentalTate")}</th>
                   <th  onClick={()=>this.raiseSort("PublishDate")}>Date {this.renderSortIcon("PublishDate")}</th>
                   <th>Like</th>
                   <th>Delete</th>
               </tr>
           </thead>
           <tbody>
               {movies.map(movie =>
                   <tr key={movie.id}>
                       <td>{movie.id}</td>
                       <td ><Link to={`/movies/${movie.id}`}> {movie.title}</Link></td>
                       <td >{movie.genre.name}</td>
                       <td >{movie.numberInStock}</td>
                       <td >{movie.dailyRentalTate}</td>
                       <td>{movie.PublishDate}</td>
                       <td><Like  onClick={() => onLike(movie)} liked={movie.liked}/></td>
                       <td><button onClick={() => onDelete(movie)} className="btn btn-info btn-sm">Delete</button></td>
                   </tr>
               )}
           </tbody>
       </table>
         );
    }
}
 
 export default MoviesTable;