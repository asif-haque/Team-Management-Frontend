import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { addToTeam } from "../redux/features/teamSlice";
import checkSameDomain from "../utils/checkSameDomain";
import checkSameUser from "../utils/checkSameUser";
import { Bounce, toast } from "react-toastify";

const Card = ({ user, add = true }) => {
  const [error, setError] = useState();
  const team = useSelector((state) => state.team.value);

  const dispatch = useDispatch();
  const handleAdd = (id) => {
    if (!user.available) {
      setError("User not available!");
    } else if (checkSameUser(team, user)) {
      setError("User already in the team!");
    } else if (checkSameDomain(team, user)) {
      setError("Member with same domain already exists in the team!");
    } else {
      dispatch(addToTeam(user));
      toast("Added in the team", {
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
    }
  };

  useEffect(() => {
    toast.error(error, {
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
  }, [error]);

  return (
    <div className="size-full border border-purple-700 rounded-lg dark:bg-gray-800 m-auto overflow-hidden hover:scale-[98%] cursor-pointer transition-all duration-300">
      <div className="flex items-center gap-2 bg-gray-700 p-2">
        <div className="rounded-full overflow-hidden border-[1px] border-neutral-500">
          <img className="size-full object-contain" src={user.avatar} alt="" />
        </div>
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {user.first_name} {user.last_name}
        </h5>
      </div>
      <div className="p-3 space-y-2">
        <div className="text-sm bg-gray-600 w-fit px-3 py-1 rounded-[100px]">
          {user.domain}
        </div>
        {user.available ? (
          <p className="text-gray-200 flex gap-1 items-center">
            <FaCheckCircle className="text-green-500" />
            Available
          </p>
        ) : (
          <p className="text-gray-400 flex gap- items-center">
            <CgUnavailable className="" />
            Unavailable
          </p>
        )}
        <p className="font-normal text-sm dark:text-gray-200">
          <span className="font-bold">Gender: </span>
          {user.gender}
        </p>
        <p className="mb-3 font-normal text-gray-700 text-sm dark:text-gray-200">
          <span className="font-bold">Email: </span>
          {user.email}
        </p>
      </div>
      {add && (
        <button
          className="mx-3 mb-5 mt-auto px-5 py-1 rounded-[100px] bg-indigo-500 hover:bg-indigo-600 transition-all duration-200"
          onClick={() => handleAdd(user._id)}
        >
          Add to Team
        </button>
      )}
    </div>
  );
};

export default Card;
