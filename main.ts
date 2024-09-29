// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import "./config/db.ts";
import user from "./routes/user.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const { PORT } = config();

const app = express();

app.use(express.json());

app.use("/user", user);

app.listen(PORT, ()=> {
  console.log("Server started on port 3000");
});
