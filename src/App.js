import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getUser } from "./services/authService";
import jwtDecode from "jwt-decode";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const currentUser = jwtDecode(jwt);
      setUser(currentUser);
    } catch (error) {}
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar user={user.name} />
      <main className="container">
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route
            path="/movies/:id"
            render={(props) => {
              const user = getUser();

              if (user && user.isAdmin) {
                return <MovieForm {...props} />;
              } else {
                toast.error(
                  "To Edit, Add, Delete a Movie should have Admin Access!"
                );
                return (
                  <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                  />
                );
              }
            }}
          />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
