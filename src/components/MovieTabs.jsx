import React from "react";
import classNames from "classnames";

const MovieTabs = props => {
    const { field, order } = props.sortBy;
    const sortMoviesBy = props.sortMoviesBy;

    const handleSortMoviesBy = listItem => {
        return () => {
            sortMoviesBy({
                field: listItem
            });
        };
    };

    const getListItemClassName = listItem => {
        return classNames({
            "nav-link": true,
            active: field === listItem
        });
    };

    return (
        <ul className="tabs nav nav-pills">
            <li className="nav-item" onClick={handleSortMoviesBy("popularity")}>
                <div className={getListItemClassName("popularity")}>
                    Popularity {order}
                </div>
            </li>
            <li className="nav-item" onClick={handleSortMoviesBy("revenue")}>
                <div className={getListItemClassName("revenue")}>
                    Revenue {order}
                </div>
            </li>
            <li
                className="nav-item"
                onClick={handleSortMoviesBy("vote_average")}
            >
                <div className={getListItemClassName("vote_average")}>
                    Vote Average {order}
                </div>
            </li>
        </ul>
    );
};

export default MovieTabs;
