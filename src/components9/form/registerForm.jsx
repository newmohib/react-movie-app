
import React from 'react';
import Form from './form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = { 
        data:{username:"", password:"",name:""},
        errors:{}
     }

    schema={
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    };

    doSubmit=()=>{
        //call thi server
        console.log('submited');
    }
    render() {
       
        return ( 
            <div className="row justify-content-center" >
            
               <div className="col-10 col-lg-4 col-md-6 col-sm-8" style={{border:"0px solid black", padding:"10px",boxSizing:"border-box",borderRadius:"5px", boxShadow:"0 0 5px 0 black",backgroundColor:"rgb(240, 240, 240)"}}>
                   <h3 className="text-center">Signup Form</h3>

                <form onSubmit={this.handleSubmit}>
                {/* registerForm position 3  form.jsx 2 input.jsx 3 */}
                  {this.renderInput('name','Name','text','autoFocus')}
                  {this.renderInput('username','Username','text','')}
                  {this.renderInput('password','Password','password','')}
                  {this.renderButton('Signup')}
                </form>
               </div>
            </div>
         );
    }
}
 
export default RegisterForm;