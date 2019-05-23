
 const MoviesData=[
    {
        id:"0",
        title:"Terminator",
        numberInStock:"6",
        dailyRentalTate:"2.5",
        PublishDate:"2018-03-03T19:04:28"
    }
    // ,
    // {
    //     id:"1",
    //     title:"Die Hard",
    //     numberInStock:"5",
    //     dailyRentalTate:"4.5",
    //     PublishDate:"2018-02-03T19:04:28"
    // },
    // {
    //     id:"2",
    //     title:"Get Out",
    //     numberInStock:"6",
    //     dailyRentalTate:"3.5",
    //     PublishDate:"2018-02-03T19:04:28"
    // },
    // {
    //     id:"3",
    //     title:"Trip To Italy",
    //     numberInStock:"6",
    //     dailyRentalTate:"4.5",
    //     PublishDate:"2018-03-03T19:04:28"
    // },
    // {
    //     id:"4",
    //     title:"Airplane",
    //     numberInStock:"6",
    //     dailyRentalTate:"1.5",
    //     PublishDate:"2018-01-03T19:04:28"
    // },
    // {
    //     id:"5",
    //     title:"Gone Girl",
    //     numberInStock:"10",
    //     dailyRentalTate:"3.5",
    //     PublishDate:"2018-02-03T19:04:28"
    // }
];


export function getMovies () {
    return MoviesData;
};

export function getMoviesId(_id) {
    return MoviesData.find((movie)=>movie.id===_id);
}