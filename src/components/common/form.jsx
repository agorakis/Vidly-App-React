import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!result.error) {
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = (e) => {
    const tempObj = { [e.currentTarget.id]: e.currentTarget.value };
    const tempSchema = {
      [e.currentTarget.id]: this.schema[e.currentTarget.id],
    };

    const result = Joi.validate(tempObj, tempSchema);

    if (!result.error) {
      return null;
    }
    return result.error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e);
    if (errorMessage) {
      errors[e.currentTarget.id] = errorMessage;
    } else {
      delete errors[e.currentTarget.id];
    }

    const tempAccount = { ...this.state.data };
    tempAccount[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data: tempAccount, errors: errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    return (
      <Select
        options={options}
        label={label}
        name={name}
        value={this.state.data[name]}
        onChange={this.handleChange}
        hint={this.state.errors[name]}
      />
    );
  }

  renderInput(name, label, type, autoFocus) {
    return (
      <Input
        autoFocus={autoFocus}
        type={type}
        label={label}
        name={name}
        value={this.state.data[name]}
        onChange={this.handleChange}
        hint={this.state.errors[name]}
      />
    );
  }
}

export default Form;
