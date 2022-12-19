import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onLike={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm m-1"
        >
          Delete
        </button>
      ),
    },
  ];

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
