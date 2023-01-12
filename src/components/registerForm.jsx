import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", fullname: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    fullname: Joi.string().required().label("Fullname"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Form Submitted");
  };

  render() {
    return (
      <div>
        <h1 className="mt-4 mb-4">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "autoFocus")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("fullname", "Fullname", "text")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
