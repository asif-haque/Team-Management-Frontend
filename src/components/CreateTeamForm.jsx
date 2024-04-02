import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTeamForm = ({ setIsFormOpen }) => {
  const [error, setError] = useState();
  const team = useSelector((state) => state.team.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.team_name.value,
      members: team,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setIsFormOpen(false);
          return toast(res.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="fixed size-full top-0 left-0 z-40 flex justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
      <form
        className="relative w-[90%] sm:w-1/3 mx-auto bg-neutral-900 p-10 rounded-2xl max-h-[70vh] overflow-scroll md:h-fit md:overflow-hidden"
        onSubmit={handleSubmit}
      >
        <IoClose
          className="text-3xl absolute right-3 top-2 cursor-pointer"
          onClick={(e) => setIsFormOpen(false)}
        />

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="team_name"
            id="team_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="team_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Team name
          </label>
          {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTeamForm;
