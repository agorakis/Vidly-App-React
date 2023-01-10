import React from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        autoFocus={props.autoFocus}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        className="form-control"
        id={props.name}
        placeholder={props.label}
      />
      {props.hint && (
        <div className="text-danger font-italic mt-1">{props.hint}</div>
      )}
    </div>
  );
};

export default Input;
