import mongo from "mongodb";
import jwt from "jsonwebtoken";

import { createTokens } from "./tokens.js";

const JWTSignature = process.env.JWT_SIGNATURE;
const { ObjectId } = mongo;

export async function getUserFromCookies(request, reply) {
  try {
    const { user } = await import("./../user/user.js");
    const { session } = await import("./../session/session.js");
    // if access token
    // this allows the conditional to resolve to false
    // if any of the nested items are undefined
    if (request?.cookies?.accessToken) {
      const { accessToken } = request.cookies;
      // decode access token
      const decodedAccessToken = jwt.verify(accessToken, JWTSignature);
      // return user from record
      return user.findOne({
        _id: ObjectId(decodedAccessToken.userId),
      });
    }

    // if there is no access token, check for a refresh token
    if (request?.cookies?.refreshToken) {
      const { refreshToken } = request.cookies;

      // this returns the all the information from the token
      // but since we only need the sessionid, we can destructure that out
      //// const decodedRefreshToken = jwt.verify(refreshToken, JWTSignature)
      //// console.log('decodedRefreshToken:', decodedRefreshToken)
      const { sessionToken } = jwt.verify(refreshToken, JWTSignature);

      // look up session
      const currentSession = await session.findOne({ sessionToken });
      console.log("currentSession:", currentSession);

      // confirm session is valid
      if (currentSession.valid) {
        const currentUser = await user.findOne({
          _id: ObjectId(currentSession.userId),
        });
        console.log("currentUser:", currentUser);
        await refreshTokens(sessionToken, currentUser._id, reply);

        return currentUser;
      }
    }

    // decode refresh token
    // look up session
    // if session valid
    // look up current user
    // refresh tokens
    // return current user
  } catch (error) {
    console.error(error);
  }
}

export async function refreshTokens(sessionId, userId, reply) {
  try {
    const { accessToken, refreshToken } = await createTokens(sessionId, userId);

    const now = new Date();
    const refreshExpires = now.setDate(now.getDate() + 30);

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
  } catch (error) {
    console.error(error);
  }
}
