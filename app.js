import express from "express";

import routes from "./routes/routes.js";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/v1/", routes);

app.listen(PORT);
