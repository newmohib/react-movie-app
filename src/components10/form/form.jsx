import React, { Component } from 'react';
import Input from '../common/input';
import Select from '../common/select';
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
        //console.log(this.state.errors,'validate');
        return errors;
    };

    validateProperty=(input)=>{
        const{name,value}=input;
        const obj ={[name]:value};
        const schema={[name]:this.schema[name]};
        //const options={abortEarly:false};
        const result=Joi.validate(obj,schema);
        const errors=result.error ? result.error.details[0].message : null;
        //console.log(errors,'validateProperty');
        return errors;
    }

    handleChange=({currentTarget:input})=>{
        const errors={...this.state.errors};
        const errorMessage=this.validateProperty(input);
        //console.log(errorMessage,'errorMessage');
        if (errorMessage){
            
             errors[input.name] = errorMessage ;
        }else{ 
            delete errors[input.name];
         };

        const data={...this.state.data};
        data[input.name]=input.value;
        //console.log(data,'data');
        this.setState({data:data,errors:errors});
    };

    handleSubmit=(element)=>{
        //this fuction is required must
         element.preventDefault();
        const errors=this.validate();
        //if errors is null the empty object is set
        this.setState({errors:errors || {}});
        if (errors) {return errors };
       let updateMovies= this.doSubmit();
       console.log(updateMovies);
    };

    renderInput(name,label,type="text",autoFocus,value){
        const {data,errors}=this.state;
        /* loginForm position 3  form.jsx 2 input.jsx 1 */
        return(
            
            <Input 
                  value={value}
                  onChange={this.handleChange} 
                  name={name}
                  lable={label}
                  type={type}
                  autoFocus={autoFocus}
                  errors={errors[name]}
                  />
        )
    }

    renderSelect(name,label,options,genreId){
        const {data,errors}=this.state;
        /* loginForm position 3  form.jsx 2 select.jsx 1 */
        return(
            
            <Select 
                  genreId={genreId}
                  onChange={this.handleChange} 
                  name={name}
                  lable={label}
                  options={options}
                  errors={errors[name]}
            />
        );
    };

    renderButton(label){
        return(
            <button disabled={this.validate()}
                   type="submit" className="btn btn-primary btn-block">{label}</button>
        )
    };
}
 
export default Form;