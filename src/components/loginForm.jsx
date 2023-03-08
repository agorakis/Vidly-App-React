import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { loginUser } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await loginUser(this.state.data);
      const jwt = response.data;
      localStorage.setItem("token", jwt);

      const state = this.props.location.state;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="mt-4 mb-4">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "autoFocus")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
