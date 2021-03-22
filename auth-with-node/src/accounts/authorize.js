import bcrypt from "bcryptjs";

const { compare } = bcrypt;

export async function authorizeUser(email, password) {
  // import user collection
  const { user } = await import("../user/user.js");

  // lookup user
  const userData = await user.findOne({
    "email.address": email,
  });

  if (!userData) {
    console.log("Account not found!");
  }

  // get user password
  const savedPassword = userData.password;

  // compare password with DB
  const isAuthorized = await compare(password, savedPassword);

  if (!isAuthorized) {
    console.log("Password incorrect!");
  }

  return { isAuthorized, userId: userData._id };
}
