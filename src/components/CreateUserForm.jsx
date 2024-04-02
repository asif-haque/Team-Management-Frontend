import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { notify } from "../utils/notify";
import { refetchData } from "../redux/features/usersSlice";
import { useDispatch } from "react-redux";

const CreateUserForm = ({ setIsFormOpen, user }) => {
  const [error, setError] = useState();
  const [val, setVal] = useState(user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (user) {
      console.log(e.target.name);
      setVal({ ...val, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      gender: e.target.gender.value,
      avatar: e.target.avatar.value,
      domain: e.target.domain.value,
      available: e.target.avail.value === "true" ? true : false,
    };
    console.log(JSON.stringify(formData));

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users${
        user ? `/${user._id}` : ``
      }`,
      {
        method: user ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setIsFormOpen(false);
          dispatch(refetchData());
          notify(res.message);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => setError(err + ""));
  };
  return (
    <div className="fixed top-0 left-0 size-full z-40 flex justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
      <form
        className="relative w-[90%] sm:w-1/2 mx-auto bg-neutral-900 p-10 rounded-2xl max-h-[70vh] overflow-scroll md:max-h-fit md:overflow-hidden"
        onSubmit={handleSubmit}
      >
        <IoClose
          className="text-3xl absolute right-3 top-3 cursor-pointer"
          onClick={(e) => setIsFormOpen(false)}
        />

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={val?.first_name}
              onChange={handleChange}
            />
            <label
              htmlFor="first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={val?.last_name}
              onChange={handleChange}
            />
            <label
              htmlFor="last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="avatar"
            id="avatar"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={val?.avatar}
            onChange={handleChange}
          />
          <label
            htmlFor="avatar"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Profile Picture Link
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={val?.email}
            onChange={handleChange}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="domain"
            id="domain"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={val?.domain}
            onChange={handleChange}
          />
          <label
            htmlFor="domain"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Domain
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group flex gap-2 items-center">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            className="px-1 py-1 rounded outline-none"
            value={val?.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group flex gap-2 items-center">
          <label htmlFor="avail">Current Availability</label>
          <select
            name="avail"
            id="avail"
            className="px-1 py-1 rounded outline-none"
            value={val?.available}
            onChange={handleChange}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {user ? `Edit` : `Create`}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
