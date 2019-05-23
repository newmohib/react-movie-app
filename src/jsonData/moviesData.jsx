
 const MoviesData=[
    {
        id:"0",
        title:"Terminator",
        numberInStock:"6",
        dailyRentalTate:"2.5",
        PublishDate:"2018-03-03T19:04:28",
        genre: { _id: "1", name: "Action" }
    },
    {
        id:"1",
        title:"Die Hard",
        numberInStock:"5",
        dailyRentalTate:"4.5",
        PublishDate:"2018-02-03T19:04:28",
        genre: { _id: "2", name: "Thriller" }
    },
    {
        id:"2",
        title:"Get Out",
        numberInStock:"6",
        dailyRentalTate:"3.5",
        PublishDate:"2018-02-03T19:04:28",
        genre: { _id: "3", name: "Comedy" }
    },
    {
        id:"3",
        title:"Trip To Italy",
        numberInStock:"6",
        dailyRentalTate:"4.5",
        PublishDate:"2018-03-03T19:04:28",
        genre: { _id: "1", name: "Action" }
    },
    {
        id:"4",
        title:"Airplane",
        numberInStock:"6",
        dailyRentalTate:"1.5",
        PublishDate:"2018-01-03T19:04:28",
        genre: { _id: "2", name: "Thriller" }
    },
    {
        id:"5",
        title:"Gone Girl",
        numberInStock:"9",
        dailyRentalTate:"3.5",
        PublishDate:"2018-02-03T19:04:28",
        genre: { _id: "1", name: "Action" }
    },{
        id:"6",
        title:"Terminator",
        numberInStock:"6",
        dailyRentalTate:"2.5",
        PublishDate:"2018-03-03T19:04:28",
        genre: { _id: "3", name: "Comedy" }
    },
    {
        id:"7",
        title:"Die Hard",
        numberInStock:"5",
        dailyRentalTate:"4.5",
        PublishDate:"2018-02-03T19:04:28",
        genre: { _id: "2", name: "Thriller" }
    },
    {
        id:"8",
        title:"Get Out",
        numberInStock:"6",
        dailyRentalTate:"3.5",
        PublishDate:"2018-02-03T19:04:28",
        genre: { _id: "1", name: "Action" }
    },
    {
        id:"9",
        title:"Trip To Italy",
        numberInStock:"6",
        dailyRentalTate:"4.5",
        PublishDate:"2018-03-03T19:04:28",
        genre: { _id: "3", name: "Comedy" }
    }
];


export function getMovies () {
    return MoviesData;
};

export function getMoviesId(_id) {
    return MoviesData.find((movie)=>movie.id===_id);
}
export function getMovie(movieId){
    let movie=MoviesData.find((movie)=>movie.id===movieId);
    console.log(movieId);
    return movie
}

export function saveMovie(movie){
    let movieInDb=MoviesData.find(m=>m.id===movie.id)||{};
    let genres=MoviesData.map(movie=>movie.genre);
    let genreNew=genres.find(genre=> genre._id===movie.genreId );
     var newDate = new Date();
     var currentDate = newDate.toLocaleString();
    movieInDb.title=movie.title;
    movieInDb.numberInStock=movie.numberInStock;
    movieInDb.dailyRentalTate=movie.dailyRentalTate;
    movieInDb.PublishDate=currentDate;
    movieInDb.genre=genreNew;

    if (!movieInDb.id) {
       let allId=MoviesData.map((movie)=>movie.id);
        let newId=Math.max(...allId);
        movieInDb.id=newId+1;
        MoviesData.push(movieInDb);
       
    }else{
         let MoviesDataNew=MoviesData.filter(MovieDataNew=> movieInDb.id !== MovieDataNew.id);
         MoviesDataNew.push(movieInDb);
         return MoviesDataNew;
    }
    
    return MoviesData
    
}


