import jwt from "jsonwebtoken";

const JWTSignature = process.env.JWT_SIGNATURE;

export async function createTokens(sessionToken, userId) {
  try {
    // create refresh token
    // needs session id
    const refreshToken = jwt.sign(
      {
        sessionToken,
      },
      JWTSignature
    );

    const accessToken = jwt.sign(
      {
        sessionToken,
        userId,
      },
      JWTSignature
    );

    return { refreshToken, accessToken };
  } catch (error) {
    console.log(error);
  }
  // create access token
  // needs session id, and user id
  // reutn refresh token and access token
}
