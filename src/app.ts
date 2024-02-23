import env from "dotenv";
import Server from "./server";
env.config();

const server = new Server(); 

server.listen();
