import React from "react";

const Select = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <select
        onChange={props.onChange}
        className="form-control"
        id={props.name}
        value={props.value}
      >
        <option value="" />
        {props.options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {props.hint && (
        <div className="text-danger font-italic mt-1">{props.hint}</div>
      )}
    </div>
  );
};

export default Select;
