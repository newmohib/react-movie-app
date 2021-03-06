
import React from 'react';

//sfc
{/* loginForm position 3  form.jsx 2 input.jsx 3 */}
const Input = ({name,lable,value,onChange,type,autoFocus, errors}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{lable}</label>
            <input
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            type={type}
            name={name} 
            id={name}
            placeholder={lable} 
            className="form-control" />
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
     );
}
 
export default Input;