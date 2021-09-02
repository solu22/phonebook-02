import React from "react";

const Filter = ({ onChange, filter }) => {
  return (
    <div>
      filter with Name: <input onChange={onChange} value={filter} />
    </div>
  );
};

export default Filter;
