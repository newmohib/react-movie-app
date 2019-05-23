import React, { Component } from 'react';


class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="http://localhost:3000/">Navbar</a>
            <a className="btn btn-outline-success" href="http://localhost:3000/">Movies</a>
            </nav>
         );
    }
}
 
export default Navbar;