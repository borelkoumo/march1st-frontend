const getUserRole = function (element) {
  if (element === "hacker") {
    return {
      role: "hacker",
      type: null,
    };
  } else if (
    element === "program_super_admin" ||
    element === "program_manager"
  ) {
    return {
      role: "client",
      type: element === "program_super_admin" ? "super_manager" : "manager",
    };
  } else if (element === "m1_account_manager") {
    return {
      role: "march1st",
      type: null,
    };
  } else {
    throw new Error("Non pris en compte");
  }
};
const getDuration = function (localDate, date) {
  const timestamp = moment(date, 'ddd MMM DD YYYY HH:mm:ss GMT Z').diff(localDate, 'hours');
  return timestamp;
};

export { getUserRole, getDuration };
