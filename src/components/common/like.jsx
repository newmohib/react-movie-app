import React, { Component } from 'react';

//<i class="fas fa-heart"></i>
//<i class="far fa-heart"></i>
class Like extends Component {
    render() {
        let classes="fa fa-heart";
        if (!this.props.liked) {
            classes +="-o";
        }
        return ( 
           <button onClick={this.props.onClick} className="btn btn-light">
                <i  style={{cursor:"pointer"}} className={classes} aria-hidden="true"></i>
           </button> 
         );
    }
}
 
export default Like;