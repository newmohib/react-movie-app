
import React, { Component } from 'react';

const Select = ({ name, lable, options, errors, ...rest }) => {
    // const items=this.props.items;
    const singleItemName = options.map(item => {
        return {
            'id': parseInt(item._id),
            'name': item.name
        }
    });
    let movieTypes = [], movieTypesId = [];
    singleItemName.map(item => {
        !movieTypesId.includes(item.id) && movieTypes.push(item) && movieTypesId.push(item.id);
    });
    return (
        <div className="form-group">
            <label htmlFor={name}>{lable}</label>
            <select name={name} id={name} {...rest} className="form-control" >
                <option value="" />
                {movieTypes.map(movie => <option key={movie.id} value={movie.id}>{movie.name}</option>)
                }
            </select>
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
}

export default Select;