import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const users = useSelector((state) => state.users.value);
  if (users.length === 0) {
    return <h1 className="text-center text-2xl">No user found :(</h1>;
  }
  return (
    <div className="m-auto space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {users.map((user) => (
        <Card user={user} key={user._id} />
      ))}
    </div>
  );
};

export default Cards;
