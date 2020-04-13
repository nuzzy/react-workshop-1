import React from "react";
import classNames from "classnames";

const calculatePagination = props => {
    const { page, pagesTotal } = props.pagination;
    const pagesCount = props.type === "micro" ? 1 : 3;
    const currentPage = page > pagesTotal ? pagesTotal : page < 1 ? 1 : page;
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
        pagesTotal: pagesTotal
    };
};

const generatePages = (start, end) => {
    return Array.from(
        Array.from(Array(end - start + 1).keys()),
        x => start + x
    );
};

const MoviePagination = props => {
    const { page, pageFirst, pageLast, pagesTotal } = calculatePagination(
        props
    );
    const pages = generatePages(pageFirst, pageLast);
    const showMoviesTotal = props.showMoviesTotal || false;

    const handlePaginateMovies = newPage => {
        return () => {
            props.paginateMovies(newPage);
        };
    };

    const getListItemClassName = pageNum =>
        classNames({
            "nav-link": true,
            active: page === pageNum,
            disabled: page === pageNum
        });

    return (
        <div className="row">
            <div className={showMoviesTotal ? "col-9" : "col-12"}>
                <ul className="tabs nav nav-pills">
                    {pageFirst > 1 ? (
                        <li
                            className="nav-item"
                            onClick={handlePaginateMovies(1)}
                        >
                            <div className="nav-link">Page 1 ...</div>
                        </li>
                    ) : (
                        ""
                    )}
                    {pages.map(pageNum => (
                        <li
                            key={pageNum}
                            className="nav-item"
                            onClick={handlePaginateMovies(pageNum)}
                        >
                            <div className={getListItemClassName(pageNum)}>
                                Page {pageNum}
                            </div>
                        </li>
                    ))}
                    {pageLast < pagesTotal ? (
                        <li
                            className="nav-item"
                            onClick={handlePaginateMovies(pagesTotal)}
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
                    ({props.pagination.moviesTotal} movies)
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default MoviePagination;
