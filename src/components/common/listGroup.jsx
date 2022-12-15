import React from "react";

const ListGroup = (props) => {
  return (
    <ul className="list-group">
      {props.genres.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item[props.valueProperty]}
          className={
            props.currentGenre === item
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => props.onGenreSelect(item)}
        >
          {item[props.textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
