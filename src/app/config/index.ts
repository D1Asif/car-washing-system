import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(), ".env")});

export default {
    port: process.env.PORT,
    database_uri: process.env.DATABASE_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    node_env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    payment_store_id: process.env.PAYMENT_STORE_ID,
    payment_signature_key: process.env.PAYMENT_SIGNATURE_KEY,
    payment_api_url: process.env.PAYMENT_API_URL,
    payment_verification_url: process.env.PAYMENT_VERIFICATION_URL
}