import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  return (
    <table className="table">
      <TableHeader
        columns={props.columns}
        sortColumn={props.sortColumn}
        onSort={props.onSort}
      />

      <TableBody data={props.data} columns={props.columns} />
    </table>
  );
};

export default Table;
