import React from "react";
import "../styles/Pagination.css";
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mainPagination">
      <div>
        <label>Set page limit:</label>
        <input
          type="number"
          min={1}
          max={10}
          value={5}
          defaultValue={5}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > 10) {
              alert("Page limit cannot be greater than 10");
            } else {
              onPageChange(value);
            }
          }}
        />
      </div>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <span
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => onPageChange(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
