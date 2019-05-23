
import React, { Component } from 'react';

class SearchBox extends Component {
    //name,label,type="text",autoFocus,value
    render() { 
        const {value,onChange}=this.props
        return ( 
            <input
                type="text"
                name="query"
                className="form-control"
                placeholder="Search..."
                value={value}
                onChange={element=> onChange(element.currentTarget.value)}
            />
         );
    }
}
 
export default SearchBox;