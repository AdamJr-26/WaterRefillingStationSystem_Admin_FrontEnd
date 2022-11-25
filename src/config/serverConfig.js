import dotenv from "dotenv";
dotenv.config();
const serverConfig = {
    PORT : ()=>{
        return env.SERVER_STATUS === "Development"?
        env.SERVER_DEV_PORT : env.SERVER_PROD_PORT;
    }
}
export default serverConfig;