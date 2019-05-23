import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Pagination extends Component {
    state = {  };
    
    render() {
        const {itemCount, pageSize,onPageChange,currentPage}=this.props;
        const pagesCount=Math.ceil(itemCount / pageSize);
        if (pagesCount===1) {
            return null
        }
        const pages= _.range(1,pagesCount +1);
        return ( 
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {pages.map(page=>
                         <li key={page}  className={page===currentPage?'page-item active':'page-item'}>
                           <button 
                           className="page-link" 
                           onClick={()=> onPageChange(page)}
                           >{page}</button>
                         </li>
                    )}
                   
                </ul>
            </nav>
         );
    }
}
//props type validation
// what value is required in thi props
Pagination.propTypes={
    itemCount:PropTypes.number.isRequired,
     pageSize:PropTypes.number.isRequired,
     onPageChange:PropTypes.func.isRequired,
     currentPage:PropTypes.number.isRequired
}
 
export default Pagination;