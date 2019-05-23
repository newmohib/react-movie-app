
import React,{Component} from 'react';


const Select = ({ name, lable, options,genreId, ...rest }) => {
    // const items=this.props.items;
    // let selectedGenre=movieType.id===genreId?"selected":"";
    const singleItemName = options.map(item => {
        return {
            'id': parseInt(item._id),
            'name': item.name
        }
    });
    //common use
    let movieTypes = [], movieTypesId = [];
    singleItemName.map(item =>  {
      return  !movieTypesId.includes(item.id) && movieTypes.push(item) && movieTypesId.push(item.id);
    });
    //this are some error here
    //selected={movieType.id==genreId ? 'selected' : ''}
    return (
        <div className="form-group">
            <label htmlFor={name}>{lable}</label>
            <select name={name} id={name} {...rest} className="form-control" >
                <option value="" />
                {movieTypes.map(movieType => 
                <option
                     key={movieType.id} 
                     value={movieType.id} 
                     selected={movieType.id==genreId ? 'selected' : ''}
                     >{movieType.name}
                </option>)
                }
            </select>
            
        </div>
    );
}

export default Select;

// const Select = ({ name,lable,options,errors, ...rest}) => {
//    // const items=this.props.items;
//     const singleItemName=options.map(item=> { return item.name} )
//     const singleItemId=options.map(item=> { return item._id} )
//     const newSingleName=[...new Set(singleItemName)];
//     const newSingleId=[...new Set(singleItemId)];
//     const obj=[{name:{...newSingleName}}, {id:{...newSingleId}}];
//     console.log(obj);
//     return ( 
//         <div className="form-group">
//             <label htmlFor={name}>{lable}</label>
//             <select name={name} id={name} {...rest} className="form-control" >
//                 <option value="" />
//                     {newSingleName.map( option=>
//                      <option key={option._id} value={option._id}>{option}</option>
//                  )}
//             </select>
//             {errors && <div className="alert alert-danger">{errors}</div>}
//         </div>
//      );
// }
 
