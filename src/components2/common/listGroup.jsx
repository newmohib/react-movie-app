import React, { Component } from 'react';

class ListGroup extends Component {
    state = {  }
    render() { 
        return ( 
         <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active">
                Cras justo odio
            </a>
            <a href="#" className="list-group-item list-group-item-action">Dapibus</a>
            <a href="#" className="list-group-item list-group-item-action">Morbi </a>
            <a href="#" className="list-group-item list-group-item-action">consectetur</a>
            <a href="#" className="list-group-item list-group-item-action">Vestibulum </a>
         </div>
         );
    }
}
 
export default ListGroup;