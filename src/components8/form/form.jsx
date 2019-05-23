import React, { Component } from 'react';
import Input from '../common/input';
import Joi from 'joi-browser';
class Form extends Component {
    state = { 
        data:{},
        errors:{}
     }

     //this object is from joi-browser
     //{abortEarly:false} this use for all invlid data is collect,, without it if any on is error then other is not read..so it use for bes
     validate=()=>{
        const result=Joi.validate(this.state.data,this.schema,{abortEarly:false});
    
        if (!result.error) { return null };
        const errors={};
        for (const item of result.error.details) {
            errors[item.path[0]]=item.message;  
        };
        return errors;
    };

    validateProperty=(input)=>{
        const{name,value}=input;
        const obj ={[name]:value};
        const schema={[name]:this.schema[name]};
        //const options={abortEarly:false};
        const result=Joi.validate(obj,schema);
        const errors=result.error ? result.error.details[0].message : null;
        return errors;
    }

    handleChange=({currentTarget:input})=>{
        const errors={...this.state.errors};
        const errorMessage=this.validateProperty(input);
        if (errorMessage){
            
             errors[input.name] = errorMessage ;
        }else{ 
            delete errors[input.name];
         };

        const data={...this.state.data};
        data[input.name]=input.value;
        this.setState({data:data,errors:errors});
    };

    handleSubmit=(element)=>{
        //this fuction is required must
         element.preventDefault();
        const errors=this.validate();
        //if errors is null the empty object is set
        this.setState({errors:errors || {}});
        if (errors) {return errors };
        this.doSubmit();
    };

    renderInput(name,label,type="text",autoFocus){
        const {data,errors}=this.state;
        {/* loginForm position 3  form.jsx 2 input.jsx 3 */}
        return(
            
            <Input 
                  value={data[name]}
                  onChange={this.handleChange} 
                  name={name}
                  lable={label}
                  type={type}
                  autoFocus={autoFocus}
                  errors={errors[name]}
                  />
        )
    }

    renderButton(label){
        return(
            <button disabled={this.validate()}
                   type="submit" className="btn btn-primary btn-block">{label}</button>
        )
    };
}
 
export default Form;