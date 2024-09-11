import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(), ".env")});

export default {
    port: process.env.PORT,
    database_uri: process.env.DATABASE_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    node_env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN
}