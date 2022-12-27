import express from "express";
const cors = require("cors");
import routes from "./routes";
// install the express to make server
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to server!" });
});

//use middleware to all routes
app.use(routes);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
