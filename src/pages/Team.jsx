import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { IoClose } from "react-icons/io5";
import CreateTeamForm from "../components/CreateTeamForm";
import TeamCard from "../components/TeamCard";

const Team = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const team = useSelector((state) => state.team.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/team`
        );
        if (!response.ok) {
          throw new Error(response.status);
        }
        const rawData = await response.json();
        setTeams(rawData.data.reverse());
        setError("");
      } catch (err) {
        setError(err + "");
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dispatch]);

  const handleCreate = () => {
    setIsFormOpen(true);
  };

  if (loading) {
    return <h1 className="text-center text-xl">Wait...</h1>;
  }

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
      {error && <h1 className="text-center text-xl text-red-500">{error}</h1>}
      {teams && (
        <>
          <div className="border border-purple-500 py-3 mb-5 rounded-lg px-5 flex items-center text-xl font-bold">
            Teams
          </div>
          <div className="space-y-3">
            {teams.map((el) => (
              <TeamCard key={el._id} team={el} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Team;
