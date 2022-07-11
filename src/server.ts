import { app } from "./app";

require("dotenv").config();

const { HOST, PORT } = process.env;

const URL = `http://${HOST}:${PORT}`;

app.listen(PORT, () => console.log(`Server on ${URL}`));
