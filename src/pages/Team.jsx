import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { IoClose } from "react-icons/io5";
import CreateTeamForm from "../components/CreateTeamForm";

const Team = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const team = useSelector((state) => state.team.value);

  const handleCreate = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      {isFormOpen && <CreateTeamForm setIsFormOpen={setIsFormOpen} />}
      <div className="border border-purple-500 py-3 mb-5 rounded-lg px-5 flex items-center">
        <span className="text-xl font-bold">Your Team</span>
        <button
          className={`bg-purple-800 ml-auto px-3 py-2 rounded-[100px] ${
            !team.length && `hidden`
          }`}
          onClick={handleCreate}
        >
          Create Team
        </button>
      </div>
      <div className="m-auto space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {team.map((member) => (
          <div key={member._id}>
            <Card user={member} add={false} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Team;
