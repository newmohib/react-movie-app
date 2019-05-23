import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import './App.css';
import Movies from './components6/movies';
import MovieForm from './components6/movieForm';
import Customers from './components6/customers';
import NotFound from './components6/notFound';
import Rentals from './components6/rentals';
import Navbar from './components6/header/navbar';
class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Navbar></Navbar>
      <main className="container">
      <Switch>
        <Route path="/movies/:id" component={MovieForm}></Route>
        <Route path="/movies" render={()=> <Movies/>}></Route>
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
