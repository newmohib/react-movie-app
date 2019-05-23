
import React from 'react';

//sfc
/* loginForm position 3  form.jsx 2 input.jsx 3 */
// ...rest= value,onChange,type,autoFocus
const Input = ({ name,lable,errors,value, ...rest}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{lable}</label>
            <input
            {...rest}
            value={value}
            name={name} 
            id={name}
            placeholder={lable} 
            className="form-control" />
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
     );
}
 
export default Input;