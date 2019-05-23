
import React, { Component } from 'react';
import Input from '../common/input';


class LoginForm extends Component {
    state = { 
        account:{
            username:"",
            password:""
        },
        errors:{}
     }

    // username=React.createRef();
    // password=React.createRef();

    //life circleHoke
    // componentDidMount(){
    //     this.username.current.focus();
    // }

    //handel change element
    // handleChange=(element)=>{
    //     const account={...this.state.account};
    //     account[element.currentTarget.name]=element.currentTarget.value;
    //     this.setState({account:account});
    // }
    //or

     //this object is from joi-browser
    validate=()=>{
        const errors={};
        const {account}=this.state;
        if (account.username.trim()==='') { errors.username='Username is required.' };
        if (account.password.trim()==='') { errors.password='Password is required.' };

        return Object.keys(errors).length===0? null:errors;
    };

    validateProperty=(input)=>{
        const{name,value}=input;
        if (name==="username") {
            if (value.trim()==='') { return "Username is required" }
            // others condition
        }
        if (name==="password") {
            if (value.trim()==='') { return "Password is required" }
            // others condition
        }
    }

    handleChange=({currentTarget:input})=>{
        const errors={...this.state.errors};
        const errorMessage=this.validateProperty(input);
        if (errorMessage){ errors[input.name] = errorMessage }
        else{ delete errors[input.name]};

        const account={...this.state.account};
        account[input.name]=input.value;
        this.setState({account:account,errors:errors});
    }
    handleSubmit=(element)=>{
       const fomeData= element.preventDefault();
    //    const username=this.username.current.value;
    //    const password=this.password.current.value;
    //    console.log(password);
    const errors=this.validate();
    //if errors is null the empty object is set
    this.setState({errors:errors || {}});

    if (errors) { console.log(errors); }else{ console.log('submited'); }
    }
    render() {
        const {account,errors}=this.state;
        return ( 
            <div className="row justify-content-center" >
            
               <div className="col-10 col-lg-4 col-md-6 col-sm-8" style={{border:"0px solid black", padding:"10px",boxSizing:"border-box",borderRadius:"5px", boxShadow:"0 0 5px 0 black",backgroundColor:"rgb(240, 240, 240)"}}>
                   <h3 className="text-center">Login Form</h3>

                <form onSubmit={this.handleSubmit}>
                  <Input 
                  value={account.username}
                  onChange={this.handleChange} 
                  name="username"
                  lable="Username"
                  type="text"
                  autoFocus="autoFocus"
                  errors={errors.username}
                  />
                  <Input 
                  value={account.password}
                  onChange={this.handleChange} 
                  name="password"
                  lable="Password"
                  type="password"
                  autoFocus=""
                  errors={errors.password}
                  />
                  <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
               </div>
            </div>
         );
    }
}
 
export default LoginForm;