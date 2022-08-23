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

const dragOverHandler = function (event){
  console.log('File(s) in drop zone');
}

export { getUserRole, dragOverHandler };
