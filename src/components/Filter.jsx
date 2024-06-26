import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuery, updateQuery } from "../redux/features/querySlice";
import Select from "./Select";
import { domains } from "../constants/domains";
import { genders } from "../constants/genders";
import { IoFilter } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Filter = () => {
  const query = useSelector((state) => state.query.value);
  const dispatch = useDispatch();

  const handleAvail = () => {
    if (!query.available) {
      dispatch(updateQuery({ available: true }));
      console.log(query);
    } else {
      console.log(query);
      dispatch(deleteQuery("available"));
    }
  };

  const handleClear = () => {
    dispatch(updateQuery({ domain: "", gender: "" }));
    dispatch(deleteQuery("available"));
  };

  return (
    <div className="space-y-3 sm:space-y-0 sm:flex flex-wrap gap-5 mb-10 items-center text-sm">
      <div className="flex items-center gap-2">
        <IoFilter />
        Filter by
      </div>
      <div
        className={`max-w-[120px] text-center px-3 py-1 rounded-[100px] outline-none cursor-pointer border border-purple-600 text-purple-500 items-center gap-2 hover:bg-purple-600 hover:text-purple-50 transition-opacity duration-300 ${
          query.domain || query.gender || query.available ? `flex` : `hidden`
        }`}
        onClick={handleClear}
      >
        <RxCross1 />
        Clear
      </div>
      <div
        className={`max-w-[120px] text-center px-3 py-1 rounded-[100px] outline-none cursor-pointer ${
          query.available
            ? `bg-purple-600 text-white`
            : `border border-purple-600 text-purple-500`
        }`}
        onClick={handleAvail}
      >
        Available
      </div>
      <Select name="gender" label="Gender" options={genders} />
      <Select name="domain" label="Domain" options={domains} />
    </div>
  );
};

export default Filter;
