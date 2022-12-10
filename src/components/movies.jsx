import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utilities/paginate";

class Movies extends Component {
  state = {
    //movies: [],
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleDelete(movie) {
    const newArray = this.state.movies.filter((temp) => temp._id !== movie._id);
    this.setState({ movies: newArray });
  }

  handleLike(movie) {
    const newArray = [...this.state.movies];
    const index = newArray.indexOf(movie);

    newArray[index] = { ...newArray[index] };

    newArray[index].liked = !newArray[index].liked;

    this.setState({ movies: newArray });
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return (
        <React.Fragment>
          <h3 className="text-center m-5">
            There are no movies in the database!
          </h3>
          <div class="d-flex justify-content-center">
            <i className="fa fa-5x fa-file-video-o" aria-hidden="true"></i>
          </div>
        </React.Fragment>
      );
    }

    const moviesArray = paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <React.Fragment>
        <h3 className="text-center m-5">
          Showing <span className="badge bg-primary text-light">{count}</span>{" "}
          movies in the database!
        </h3>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {moviesArray.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>

                <td>
                  <Like
                    onLike={() => this.handleLike(movie)}
                    liked={movie.liked}
                  />
                </td>

                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm m-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          totalMovies={count}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
