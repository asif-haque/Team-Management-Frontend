import React from "react";
import { FaUser } from "react-icons/fa";

const TeamCard = ({ team }) => {
  return (
    <div className="bg-gray-600 rounded-xl overflow-hidden hover:scale-[99%] transition-all cursor-pointer">
      <div className="bg-gray-700 px-5 py-2 font-bold">Team: {team.name}</div>
      <div className="md:grid grid-cols-2 gap-2 px-5 py-5">
        {team.members.map((member) => (
          <div key={member._id} className="flex items-center gap-2">
            <FaUser className="text-neutral-900 text-xl" />
            <div className="flex gap-1 items-center">
              <span>
                {member.first_name} {member.last_name}
              </span>
              -<span className="opacity-[50%]">{member.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
