// fastify is the server library from https://www.fastify.io/
import { fastify } from "fastify";
// fastify-static is a plugin that makes hosting a static file directory very easy
import fastifyClassic from "fastify-static";

// while __dirname and __filename are usually a default in node
// with ESM you have to make them yourself.
// Feature, not a bug
import path from "path";
import { fileURLToPath } from "url";

// import meta allows us to get metadata about our files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create our app with fastify
const app = fastify();

async function startApp() {
  try {
    // registers the static file directory
    // as the current directory { __dirname } with the "public" folder inside of it
    app.register(fastifyClassic, {
      root: path.join(__dirname, "public"),
    });

    // return "Hello again" when you visit localhost:3000/get
    // app.get("/", {}, () => {})
    app.get("/get", {}, (request, reply) => {
      reply.send({ data: "Hello again 👋" });
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
startApp();