import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import MoviePagination from "./MoviePagination";
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
            },
            pagination: {
                page: 1,
                pagesTotal: 500,
                moviesTotal: 10000
            }
        };
    }

    componentDidMount() {
        this.fetchMovieData(this.state.sortBy, this.state.pagination);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.isMovieFilterChanged(prevState, this.state)) {
            this.fetchMovieData(this.state.sortBy, this.state.pagination);
        }
    }

    isMovieFilterChanged = (prevState, currentState) => {
        const {
            sortBy: { field: currentSortField, order: currentSortOrder },
            pagination: { page: currentPage }
        } = currentState;
        const {
            sortBy: { field: prevSortField, order: prevSortOrder },
            pagination: { page: prevPage }
        } = prevState;

        if (
            prevSortField !== currentSortField ||
            prevSortOrder !== currentSortOrder ||
            prevPage !== currentPage
        ) {
            return true;
        }

        return false;
    };

    fetchMovieData = (sortBy, pagination) => {
        const { field, order } = sortBy;
        const { page } = pagination;
        const url = `${API_URL}${API_ENDPOINT_DISCOVERY_MOVIE}?api_key=${API_KEY_3}&sort_by=${field}.${order}&page=${page}`;
        console.log(url);

        fetch(url)
            .then(Response => Response.json())
            .then(moviesData =>
                this.setState({
                    movies: moviesData.results,
                    pagination: {
                        page: moviesData.page,
                        pagesTotal: moviesData.total_pages,
                        moviesTotal: moviesData.total_results
                    }
                })
            );
    };

    deleteMovie = movie => {
        const updateMovies = this.state.movies.filter(
            item => item.id !== movie.id
        );

        this.setState({
            movies: updateMovies
        });

        this.deleteMovieFromWillWatch(movie);
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
        this.setState({
            sortBy: {
                field: sortBy.field,
                order: this.calculateSortOrder(this.state.sortBy, sortBy)
            }
        });
    };

    calculateSortOrder = (currentSortBy, sortBy) => {
        if (sortBy.field !== currentSortBy.field) {
            return currentSortBy.order;
        }

        return currentSortBy.order === "desc" ? "asc" : "desc";
    };

    paginateMovies = page => {
        const { pagesTotal, moviesTotal } = this.state.pagination;

        this.setState({
            pagination: {
                page: page,
                pagesTotal: pagesTotal,
                moviesTotal: moviesTotal
            }
        });
    };

    render() {
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
                        <div className="row mb-4">
                            <div className="col-12">
                                <MoviePagination
                                    type="micro"
                                    showMoviesTotal={true}
                                    pagination={this.state.pagination}
                                    paginateMovies={this.paginateMovies}
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
                        <div className="row mb-4">
                            <div className="col-12">
                                <MoviePagination
                                    type="full"
                                    pagination={this.state.pagination}
                                    paginateMovies={this.paginateMovies}
                                />
                            </div>
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
