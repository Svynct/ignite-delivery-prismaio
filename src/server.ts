import express, { json } from "express";

import { routes } from "./routes";

const app = express();

app.use(json());
app.use(routes);

app.listen(3000, () => {
  console.log("");
  console.log("Server is running on http://localhost:3000")
});