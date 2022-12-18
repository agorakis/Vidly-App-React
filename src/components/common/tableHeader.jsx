import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const tempSortColumn = { ...this.props.sortColumn };

    if (tempSortColumn.path === path) {
      tempSortColumn.order = tempSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      tempSortColumn.path = path;
      tempSortColumn.order = "asc";
    }
    this.props.onSort(tempSortColumn);
  };

  renderSortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path || !column.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              scope="col"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
export default TableHeader;
