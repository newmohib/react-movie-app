import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import './App.css';
import Movies from './components10/movies';
import MovieForm from './components10/form/movieForm';
import Customers from './components10/customers';
import NotFound from './components10/notFound';
import Rentals from './components10/rentals';
import Navbar from './components10/header/navbar';
import LoginForm from './components10/form/loginForm';
import RegisterForm from './components10/form/registerForm';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Navbar></Navbar>
      <main className="container">
      <Switch>
        <Route path="/registerForm" component={RegisterForm}></Route>
        <Route path="/loginForm" component={LoginForm}></Route>
        {/* <Route path="/movies/:id" component={MovieForm}></Route> */}
        <Route path="/movies/:id"  component={MovieForm}></Route>
        <Route path="/movies" exact render={()=> <Movies/>}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect exact from="/" to="/movies"></Redirect>
        <Redirect to="not-found"></Redirect>
      </Switch>
        
      </main>
      </React.Fragment>
    );
  }
}

export default App;
