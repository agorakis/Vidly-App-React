import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const totalPages = props.totalMovies / props.pageSize;

  if (totalPages <= 1) {
    return null;
  }

  const pagesArray = _.range(1, totalPages + 1);

  return (
    <nav>
      <ul className="pagination">
        {pagesArray.map((page) => (
          <li
            key={page}
            className={
              page === props.currentPage ? "page-item active " : "page-item"
            }
          >
            <a className="page-link" onClick={() => props.onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
