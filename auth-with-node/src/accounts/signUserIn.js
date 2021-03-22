import { createSession } from "./session.js";
import { createTokens } from "./tokens.js";

export async function signUserIn(userId, request, reply) {
  // create connection information for session detials
  const connectionInformation = {
    // not going to be the same for every system but fastify makes this available
    ip: request.ip,
    userAgent: request.headers["user-agent"],
  };

  // create session with userId, and connectionInformation
  const sessionToken = await createSession(userId, connectionInformation);
  console.log("Session token: ", sessionToken);

  // create jwt
  const { refreshToken, accessToken } = await createTokens(
    sessionToken,
    userId
  );

  const now = new Date();
  const refreshExpires = now.setDate(now.getDate + 30);

  // set cookie
  reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      expires: refreshExpires,
    })
    .setCookie("accessToken", accessToken, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
    });
}
