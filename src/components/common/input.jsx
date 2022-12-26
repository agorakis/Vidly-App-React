import React from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        autoFocus={props.autoFocus}
        onChange={props.onChange}
        value={props.value}
        type="text"
        className="form-control"
        id={props.name}
        placeholder={props.label}
      />
    </div>
  );
};

export default Input;
