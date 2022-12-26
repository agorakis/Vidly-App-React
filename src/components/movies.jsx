import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utilities/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    const newArray = this.state.movies.filter((temp) => temp._id !== movie._id);
    this.setState({ movies: newArray });
  };

  handleLike = (movie) => {
    const newArray = [...this.state.movies];
    const index = newArray.indexOf(movie);
    newArray[index] = { ...newArray[index] };
    newArray[index].liked = !newArray[index].liked;
    this.setState({ movies: newArray });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (tempSortColumn) => {
    this.setState({ sortColumn: tempSortColumn });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return (
        <React.Fragment>
          <h3 className="text-center mt-4 mb-4">
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

    const sortedArray = _.orderBy(
      filteredMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const moviesArray = paginate(
      sortedArray,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <React.Fragment>
        <h3 className="text-center mt-4 mb-4">
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
              <MoviesTable
                movies={moviesArray}
                sortColumn={this.state.sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />

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
