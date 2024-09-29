import mongoose from "npm:mongoose";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const env = config();
await mongoose.connect(env.MONGO_URL);
const connection = mongoose.connection.readyState;
if(connection) {
    console.log("DB connected");
}