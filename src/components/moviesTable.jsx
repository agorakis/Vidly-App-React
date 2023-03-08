import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/authService";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onLike={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
  ];

  constructor() {
    super();

    const deleteColumn = {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm m-1"
        >
          Delete
        </button>
      ),
    };

    const user = getUser();

    if (user && user.isAdmin) {
      this.columns = [...this.columns, deleteColumn];
    }
  }

  render() {
    return (
      <Table
        data={this.props.movies}
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
      />
    );
  }
}

export default MoviesTable;
