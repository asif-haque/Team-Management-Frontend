import React from "react";
import { useDispatch } from "react-redux";
import { updateQuery } from "../redux/features/querySlice";

const Pagination = ({ totalPages }) => {
  // let arr = [];
  // while (totalPages !== 0) {
  //   arr.push(totalPages--);
  // }
  const dispatch = useDispatch();
  return (
    <div className="flex flex-wrap gap-2 w-1/2 m-auto justify-center my-10">
      {Array.from({ length: totalPages }).map((el, index) => (
        <div
          key={index}
          className="bg-gray-800 px-2 py-1 cursor-pointer"
          onClick={() => dispatch(updateQuery({ page: index + 1 }))}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
