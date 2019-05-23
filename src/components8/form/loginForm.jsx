
import React from 'react';
import Form from './form';
import Joi from 'joi-browser';

class LoginForm extends Form {
    state = { 
        data:{username:"", password:""},
        errors:{}
     }

    schema={
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    doSubmit=()=>{
        //call thi server
        console.log('submited');
    }
    render() {
        const {data,errors}=this.state;
        return ( 
            <div className="row justify-content-center" >
            
               <div className="col-10 col-lg-4 col-md-6 col-sm-8" style={{border:"0px solid black", padding:"10px",boxSizing:"border-box",borderRadius:"5px", boxShadow:"0 0 5px 0 black",backgroundColor:"rgb(240, 240, 240)"}}>
                   <h3 className="text-center">Login Form</h3>

                <form onSubmit={this.handleSubmit}>
                {/* loginForm position 3  form.jsx 2 input.jsx 3 */}
                  {this.renderInput('username','Username','text','autoFocus')}
                  {this.renderInput('password','Password','password','')}
                  {this.renderButton('Login')}
                </form>
               </div>
            </div>
         );
    }
}
 
export default LoginForm;