import { randomBytes } from "crypto";

export async function createSession(userId, connection) {
  try {
    // generate a session token
    const sessionToken = randomBytes(42).toString("hex");

    // retrieve connection information
    const { ip, userAgent } = connection;

    // insert session into database
    const { session } = await import("./../session/session.js");

    // add session into DB
    await session.insertOne({
      sessionToken,
      userId,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    // return session token
    return sessionToken;
  } catch (error) {
    console.log(error);
    throw new Error("Session creation failed");
  }
}
