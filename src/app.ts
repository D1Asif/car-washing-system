import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

// parser
app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use('/api', router);

app.use("/test", (req, res) => {
    console.log("hi test");
    res.send("test route");
})

app.get("/", (req, res) => {
    res.send("Welcome to Car Washing System API!");
})

app.use(globalErrorHandler);

app.use(notFound);

export default app;