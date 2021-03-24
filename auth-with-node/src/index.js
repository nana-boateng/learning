import "./env.js";
// this import has to be at the very top of the root file
// this kind of import, imports the file and runs it immediately

// fastify is the server library from https://www.fastify.io/
import { fastify } from "fastify";
// fastify-static is a plugin that makes hosting a static file directory very easy
import fastifyStatic from "fastify-static";
//fastify cookie
import fastifyCookie from "fastify-cookie";
// while __dirname and __filename are usually a default in node
// with ESM you have to make them yourself.
// Feature, not a bug
import path from "path";
import { fileURLToPath } from "url";

import { registerUser } from "./accounts/register.js";
import { authorizeUser } from "./accounts/authorize.js";
import { signUserIn } from "./accounts/signUserIn.js";
import { getUserFromCookies } from "./accounts/user.js";

import { connectDb } from "./db.js";

// import meta allows us to get metadata about our files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create our app with fastify
const app = fastify();

// this doesn't seem to work with nodemon?
// console.log("We on?: ", process.env.MONGO_URL);

async function startApp() {
  try {
    // registers the static file directory
    // as the current directory { __dirname } with the "public" folder inside of it

    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SIGNATURE,
    });

    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    app.post("/api/register", {}, async (request, reply) => {
      try {
        const userId = await registerUser(
          request.body.email,
          request.body.password
        );
      } catch (error) {
        console.log(error);
      }
    });

    app.post("/api/authorize", {}, async (request, reply) => {
      try {
        const { isAuthorized, userId } = await authorizeUser(
          request.body.email,
          request.body.password
        );
        if (isAuthorized) {
          // generate auth token
          // set cookies
          await signUserIn(userId, request, reply);
          reply.send({
            data: "Success!",
          });
        } else {
          reply.send({
            data: "auth-fail",
          });
        }
      } catch (error) {
        console.log(error);
      }
    });

    // this test route helps us debug and test requests
    app.get("/test", {}, async (request, reply) => {
      try {
        // verify user login
        const user = await getUserFromCookies(request, reply);
        // if user email, return else return unathorize
        if (user) {
          reply.send(user);
        } else {
          reply.send({
            data: "User lookup failed...",
          });
        }
      } catch (error) {
        console.error(error);
      }
    });

    // return "Hello again" when you visit localhost:3000/say-hi
    // app.get("/", {}, () => {})
    app.get("/say-hi", {}, (request, reply) => {
      reply.send({ data: "Hello 👋" });
    });

    // remember the function returns a promise so use this await
    // to wait for a fulfilment
    console.log("🚀 Server listening from port 3000");
    await app.listen(3000);
  } catch (e) {
    console.error(e);
  }
}

// why wrap the app start in an asyn/await?
// we will need to wait for out database to
// start up before we start the app

connectDb().then(() => {
  startApp();
});
