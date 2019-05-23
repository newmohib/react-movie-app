import React,{Component} from 'react';
import  Like  from "./like";




class MoviesTable extends Component {
    raiseSort=(head)=>{
        const sortColumn=this.props.sortColumn;
        if (sortColumn.path===head) {
            sortColumn.order= sortColumn.order==="asc"?"desc":"asc";
        }else{
           sortColumn.path=head;
           sortColumn.order="asc";
        }
        this.props.onSort(sortColumn);
    };

    render() { 
        const {movies, onDelete, onLike}=this.props;
        return ( 
           <table className="table">
           <thead>
               <tr style={{cursor:"pointer"}}>
                   <th  onClick={()=>this.raiseSort("id")}>ID</th>
                   <th onClick={()=>this.raiseSort("title")}>Title</th>
                   <th onClick={()=>this.raiseSort("genre.name")}>Type</th>
                   <th onClick={()=>this.raiseSort("numberInStock")}>Stock</th>
                   <th onClick={()=>this.raiseSort("dailyRentalTate")}>Rate</th>
                   <th  onClick={()=>this.raiseSort("PublishDate")}>Date</th>
                   <th>Like</th>
                   <th>Delete</th>
               </tr>
           </thead>
           <tbody>
               {movies.map(movie =>
                   <tr key={movie.id}>
                       <td>{movie.id}</td>
                       <td >{movie.title}</td>
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