import React, { Component } from 'react';

class ListGroup extends Component {
    state = {  }
    render() {
        const items=this.props.items;
        const singleItem=items.map(item=>item.name)
        const newSingleName=[...new Set(singleItem)];
        newSingleName.unshift("All-Item")
        //const item=items.filter(item )
        return ( 
         <div className="list-group">
                <button className="list-group-item list-group-item-action active">Movies Type</button>
                 {newSingleName.map(item=>
                      <button style={{cursor:"pointer"}} key={item} onClick={()=>this.props.onItemSelect(items,item)}  className="list-group-item list-group-item-action">
                        {item}
                       </button>
                )}
               
            
         </div>
         );
    }
}
 
export default ListGroup;