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
                    Popularity {order === "desc" ? `\u2193` : `\u2191`}
                </div>
            </li>
            <li className="nav-item" onClick={handleSortMoviesBy("revenue")}>
                <div className={getListItemClassName("revenue")}>
                    Revenue {order === "desc" ? `\u2193` : `\u2191`}
                </div>
            </li>
            <li
                className="nav-item"
                onClick={handleSortMoviesBy("vote_average")}
            >
                <div className={getListItemClassName("vote_average")}>
                    Vote Average {order === "desc" ? `\u2193` : `\u2191`}
                </div>
            </li>
        </ul>
    );
};

export default MovieTabs;
