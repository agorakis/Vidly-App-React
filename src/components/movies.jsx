import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utilities/paginate";
import { set } from "lodash";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGenreSelect = this.handleGenreSelect.bind(this);
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genres });
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

  handleGenreSelect(genre) {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return (
        <React.Fragment>
          <h3 className="text-center m-5">
            There are no movies in the database!
          </h3>
          <div className="d-flex justify-content-center">
            <i className="fa fa-5x fa-file-video-o" aria-hidden="true"></i>
          </div>
        </React.Fragment>
      );
    }

    const filteredMovies =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;

    const moviesArray = paginate(
      filteredMovies,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <React.Fragment>
        <h3 className="text-center m-5">
          Showing
          <span className="badge bg-primary text-light ml-2 mr-2">
            {filteredMovies.length}
          </span>
          movies in the database!
        </h3>

        <div className="container text-center">
          <div style={{ rowGap: "15px" }} className="row">
            <div className="col-4">
              <ListGroup
                genres={this.state.genres}
                currentGenre={this.state.selectedGenre}
                onGenreSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col">
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
                totalMovies={filteredMovies.length}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
