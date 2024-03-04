import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageLimit = 5;
  const pageNumbers = [];
  
  let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  let endPage = Math.min(totalPages, startPage + pageLimit - 1);

  if (totalPages - endPage < Math.floor(pageLimit / 2)) {
    startPage = Math.max(1, endPage - pageLimit + 1);
  } else if (startPage <= Math.floor(pageLimit / 2)) {
    endPage = Math.min(totalPages, startPage + pageLimit - 1);
  }

  for (let i = startPage; i <= endPage; i++) {
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
          value={pageLimit}
          defaultValue={pageLimit}
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
        {startPage > 1 && <span onClick={() => onPageChange(1)}>1</span>}
        {startPage > 2 && <span>...</span>}
        {pageNumbers.map((number) => (
          <span
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => onPageChange(number)}
          >
            {number}
          </span>
        ))}
        {endPage < totalPages - 1 && <span>...</span>}
        {endPage < totalPages && (
          <span onClick={() => onPageChange(totalPages)}>{totalPages}</span>
        )}
      </div>
    </div>
  );
};

export default Pagination;
