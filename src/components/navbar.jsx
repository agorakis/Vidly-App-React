import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <NavLink className="navbar-brand font-weight-bold" to="/">
        Vidly
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>
          {!props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/login">
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link  font-weight-bold" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/profile">
                  {props.user}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/logout">
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
