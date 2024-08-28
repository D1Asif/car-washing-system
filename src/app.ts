import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";

const app = express();

// parser
app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use('/api/v1', router);

export default app;