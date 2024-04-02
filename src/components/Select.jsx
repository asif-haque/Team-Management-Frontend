import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuery } from "../redux/features/querySlice";

const Select = ({ name, label, options, all = true }) => {
  const query = useSelector((state) => state.query.value);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateQuery({ [name]: e.target.value }));
  };
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="domain" className="">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={query[name]}
        onChange={handleChange}
        className={`w-fit text-center px-3 py-1 rounded-[100px] outline-none font-medium cursor-pointer ${
          query[name]
            ? `bg-purple-600 text-white`
            : `border border-purple-600 text-purple-500`
        }`}
      >
        <option value="" className="text-left bg-neutral-900">
          {all ? `All` : `Select`}
        </option>
        {options.map((option) => (
          <option
            value={option}
            className="text-left bg-neutral-900"
            key={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
