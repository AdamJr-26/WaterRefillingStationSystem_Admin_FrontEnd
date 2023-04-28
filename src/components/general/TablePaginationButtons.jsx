import React from "react";

function TablePaginationButtons({pages,setPage, currentPage, totalPages }) {
  return (
    <div className="report-table-transactions">
      <button
        onClick={() => {
          if (1 < currentPage) {
            setPage(currentPage - 1);
          }
        }}
        className="report-table-transactions--prev"
      >
        prev
      </button>
      <div className="report-table-transactions--pages">
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`report-table-transactions--pages__page ${
              pageNum === currentPage ? "active-page" : ""
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (totalPages > currentPage) {
            setPage(currentPage + 1);
          }
        }}
        className="report-table-transactions--next"
      >
        next
      </button>
    </div>
  );
}

export default TablePaginationButtons;
