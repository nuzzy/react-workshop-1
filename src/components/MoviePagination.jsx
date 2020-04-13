import React from "react";
import classNames from "classnames";

class MoviePagination extends React.Component {
    constructor(props) {
        super(props);

        const {
            page,
            pageFirst,
            pageLast,
            pagesCount
        } = this.calculatePagination(this.props);

        this.state = {
            pagesCount: pagesCount,
            page: page,
            pageFirst: pageFirst,
            pageLast: pageLast,
            pages: this.generatePages(pageFirst, pageLast),
            showMoviesTotal: props.showMoviesTotal || false,
            paginateMovies: props.paginateMovies
        };
    }

    updatePagination = props => {
        const {
            page,
            pageFirst,
            pageLast,
            pagesCount
        } = this.calculatePagination(props);
        console.log("updatePagination", page);

        this.setState({
            pagesCount: pagesCount,
            page: page,
            pageFirst: pageFirst,
            pageLast: pageLast,
            pages: this.generatePages(pageFirst, pageLast)
        });
    };

    calculatePagination = props => {
        const { page, pagesTotal } = props.pagination;
        const pagesCount = props.type === "micro" ? 1 : 3;
        const currentPage =
            page > pagesTotal ? pagesTotal : page < 1 ? 1 : page;
        const pageFirst =
            currentPage - pagesCount >= 1 ? currentPage - pagesCount : 1;
        const pageLast =
            currentPage + pagesCount <= pagesTotal
                ? currentPage + pagesCount
                : pagesTotal;

        return {
            page: currentPage,
            pageFirst: pageFirst,
            pageLast: pageLast,
            pagesCount: pagesCount
        };
    };

    generatePages = (start, end) => {
        return Array.from(
            Array.from(Array(end - start + 1).keys()),
            x => start + x
        );
    };

    handlePaginateMovies = newPage => {
        const props = { ...this.props, page: newPage };

        return () => {
            console.log("handlePaginateMovies", props);
            this.updatePagination(props);

            this.state.paginateMovies(newPage);
            console.log(newPage, this.state);
        };
    };

    getListItemClassName = pageNum =>
        classNames({
            "nav-link": true,
            active: this.state.page === pageNum,
            disabled: this.state.page === pageNum
        });

    render() {
        const pagesTotal = this.props.pagination.pagesTotal;
        const showMoviesTotal = this.state.showMoviesTotal;

        return (
            <div className="row">
                <div className={showMoviesTotal ? "col-9" : "col-12"}>
                    <ul className="tabs nav nav-pills">
                        {this.state.pageFirst > 1 ? (
                            <li
                                className="nav-item"
                                onClick={this.handlePaginateMovies(1)}
                            >
                                <div className="nav-link">Page 1 ...</div>
                            </li>
                        ) : (
                            ""
                        )}
                        {this.state.pages.map(pageNum => (
                            <li
                                key={pageNum}
                                className="nav-item"
                                onClick={this.handlePaginateMovies(pageNum)}
                            >
                                <div
                                    className={this.getListItemClassName(
                                        pageNum
                                    )}
                                >
                                    Page {pageNum}
                                </div>
                            </li>
                        ))}
                        {this.state.pageLast < pagesTotal ? (
                            <li
                                className="nav-item"
                                onClick={this.handlePaginateMovies(pagesTotal)}
                            >
                                <div className="nav-link">
                                    ... Page {pagesTotal}
                                </div>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                </div>
                {showMoviesTotal ? (
                    <div className="col-3">
                        ({this.props.pagination.moviesTotal} movies)
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default MoviePagination;
