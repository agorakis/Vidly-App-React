import React from "react";

const SearchBox = (props) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control mb-3"
      placeholder="Search..."
      value={props.value}
      onChange={(e) => props.onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
