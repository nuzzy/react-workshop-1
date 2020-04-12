import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import { API_URL, API_KEY_3, API_ENDPOINT_DISCOVERY_MOVIE } from "../utils/api";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            moviesWillWatch: [],
            sortBy: {
                field: "popularity",
                order: "desc"
            }
        };
    }

    componentDidMount() {
        console.log("DidMount");
        this.fetchMovieData(this.state.sortBy);
    }

    fetchMovieData = sortBy => {
        const { field, order } = sortBy;
        const url = `${API_URL}${API_ENDPOINT_DISCOVERY_MOVIE}?api_key=${API_KEY_3}&sort_by=${field}.${order}`;
        console.log(url);

        fetch(url)
            .then(Response => Response.json())
            .then(moviesData =>
                this.setState({
                    movies: moviesData.results
                })
            );
    };

    componentDidUpdate() {
        console.log("DidUpdate");
    }

    deleteMovie = movie => {
        console.log(movie.id);
        const updateMovies = this.state.movies.filter(
            item => item.id !== movie.id
        );

        // this.state.movies = updateMovies;
        this.setState({
            movies: updateMovies
        });
    };

    addMovieToWillWatch = movie => {
        const updateMoviesWillWatch = [...this.state.moviesWillWatch];
        updateMoviesWillWatch.push(movie);

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    deleteMovieFromWillWatch = movie => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
            item => item.id !== movie.id
        );

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    sortMoviesBy = sortBy => {
        console.log("SORT-BY:", sortBy);
        const isOrderTheSame = sortBy.field === this.state.sortBy.field;
        const currentOrder = this.state.sortBy.order;
        const order = isOrderTheSame
            ? currentOrder === "desc"
                ? "asc"
                : "desc"
            : currentOrder;
        const updatedSortBy = {
            field: sortBy.field,
            order: order
        };

        this.setState({
            sortBy: updatedSortBy
        });

        this.fetchMovieData(updatedSortBy);
    };

    render() {
        console.log("render");
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-9">
                        <div className="row mb-4">
                            <div className="col-12">
                                <MovieTabs
                                    sortBy={this.state.sortBy}
                                    sortMoviesBy={this.sortMoviesBy}
                                />
                            </div>
                        </div>
                        <div className="row">
                            {this.state.movies.map(movie => {
                                return (
                                    <div className="col-6 mb-4" key={movie.id}>
                                        <MovieItem
                                            data={movie}
                                            deleteMovie={this.deleteMovie}
                                            addMovieToWillWatch={
                                                this.addMovieToWillWatch
                                            }
                                            deleteMovieFromWillWatch={
                                                this.deleteMovieFromWillWatch
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-3">
                        <h4>
                            Will Watch: {this.state.moviesWillWatch.length}{" "}
                            movies
                        </h4>
                        <ul className="list-group">
                            {this.state.moviesWillWatch.map(movie => (
                                <li key={movie.id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <p>{movie.title}</p>
                                        <p>{movie.vote_average}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
