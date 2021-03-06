import React from "react";

const Spinner = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  );
};

export default Spinner;
