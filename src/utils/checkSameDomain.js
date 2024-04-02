const checkSameDomain = (team, user) => {
  const found = team.find((el) => el.domain === user.domain);
  return found ? true : false;
};

export default checkSameDomain;
