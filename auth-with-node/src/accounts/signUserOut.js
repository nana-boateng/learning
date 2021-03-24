import jwt from "jsonwebtoken";

const JWTSignature = process.env.JWT_SIGNATURE;

export async function signUserOut(request, reply) {
  try {
    const { session } = await import("./../session/session.js");
    if (request?.cookies?.refreshToken) {
      // get refresh token
      const { refreshToken } = request.cookies;
      // decode sessionToken from refresh token
      const { sessionToken } = jwt.verify(refreshToken, JWTSignature);
      // delete database record for session
      await session.deleteOne({ sessionToken });
    }
    // remove cookies
    reply.clearCookie("refreshToken").clearCookie("accessToken");
  } catch (error) {
    console.log(error);
  }
}
