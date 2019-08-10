function User(userInputData) {
  const userData = {
    email: userInputData.email
  };
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) {
    throw new Error(`${userData.email} is not a valid Email Address.`);
  }

  return userData;
  
}

export default User;
