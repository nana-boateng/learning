import bcrypt from "bcryptjs";
// import { user } from "../user/user.js";

const { genSalt, hash } = bcrypt;

export async function registerUser(email, password) {
  // dynamic import, not imported until its needed
  // this allows us to wait for the database to start before
  const { user } = await import("../user/user.js");

  // generate salt
  const salt = await genSalt(10);

  // hash password with salt
  const hashedPassword = await hash(password, salt);

  // store in DB
  const result = await user.insertOne({
    email: {
      address: email,
      verified: false,
    },
    password: hashedPassword,
  });

  // return user from DB
  return result.insertedId;
}
