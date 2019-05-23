
import React from 'react';
import { getMovies, getMovie,saveMovie } from "../../jsonData/moviesData";
import Form from './form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = {
        fixdOldMovies: [],
        fixdNewMovies: [],
        data: {title: "", genreId: "", numberInStock: "", dailyRentalTate: "" },
        updateMovieId:{id:''},
        genres: [],
        errors: {}
    }

    schema = {
        //id: Joi.string().required().label('ID'),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalTate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')

        // title: Joi.string().label('Title'),
        // genreId: Joi.string().label('Genre'),
        // numberInStock: Joi.number().label('Number in Stock'),
        // dailyRentalTate: Joi.number().label('Daily Rental Rate')
    };

    //bultin fuction setStates for dom
    componentDidMount() {
        //this.setState({movies:getMovies(),fixdMovies:getMovies()});
        const genres = getMovies().map(movie => movie.genre);
        this.setState({ genres: genres, fixdOldMovies: getMovies() });

        const movieId = this.props.match.params.id;
        if (movieId === "new") {
            return //this.props.history.replace("/movies/new")
        };
        const movie = getMovie(movieId);
        if (!movie) { return this.props.history.replace("/not-found") };

        this.setState({ data: this.mapToViewModel(movie),updateMovieId:{id:movieId} });
    };
    mapToViewModel(movie) {
        const { id, title, genre, numberInStock, dailyRentalTate } = movie;
        // var newDate = new Date();
        // var currentDate = newDate.toLocaleString();
        console.log(this.state.errors);
        return {
            
            title: title,
            genreId: genre._id,
            numberInStock: numberInStock,
            dailyRentalTate: dailyRentalTate
        }
        
    }
//there are work for sprade opretor
//do not update in old data
    doSubmit = () => {
        //after submit then save here
        let newMovie={...this.state.data,...this.state.updateMovieId};
        console.log(newMovie);
        let saveNewMovie=  saveMovie(newMovie);
        if (saveNewMovie) {
            this.props.history.push("/movies");
        }else{
            this.props.history.push("/movies/new");
        }
        
    }
    render() {
        const { title, genreId, numberInStock, dailyRentalTate, PublishDate } = this.state.data;
        return (
            <div className="row justify-content-center" >

                <div className="col-10 col-lg-4 col-md-6 col-sm-8" style={{ border: "0px solid black", padding: "10px", boxSizing: "border-box", borderRadius: "5px", boxShadow: "0 0 5px 0 black", backgroundColor: "rgb(240, 240, 240)" }}>
                    <h3 className="text-center">Add Movie Form</h3>
                    <form onSubmit={this.handleSubmit}>
                        {/* movieForm position 3  form.jsx 2 input.jsx 3 */}
                        {this.renderInput('title', 'Title', 'text', 'autoFocus', title)}
                        {this.renderSelect('genreId', 'Genre', this.state.genres,genreId)}
                        {this.renderInput('numberInStock', 'Number in Stock', 'number', '',numberInStock)}
                        {this.renderInput('dailyRentalTate', 'Rate', 'number', '',dailyRentalTate)}
                        {/* {this.renderInput('PublishDate', 'Date', 'datetime-local', '',PublishDate)} */}
                        {this.renderButton('Submit')}
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterForm;