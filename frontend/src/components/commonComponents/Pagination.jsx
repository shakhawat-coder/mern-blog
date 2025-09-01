import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        {/* <span>
                        Page {currentPage} of {totalPages}
                    </span> */}
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
