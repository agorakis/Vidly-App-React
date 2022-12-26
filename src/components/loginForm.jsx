import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  handleChange = (e) => {
    const tempAccount = { ...this.state.account };
    tempAccount[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ account: tempAccount });
  };

  render() {
    return (
      <div>
        <h1 className="mt-4 mb-4">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus="autoFocus"
            label="Username"
            name="username"
            value={this.state.account.username}
            onChange={this.handleChange}
          />

          <Input
            label="Password"
            name="password"
            value={this.state.account.password}
            onChange={this.handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
