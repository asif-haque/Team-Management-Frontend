const checkSameUser = (team, user) => {
  const found = team.find((el) => el._id === user._id);
  return found ? true : false;
};

export default checkSameUser;
