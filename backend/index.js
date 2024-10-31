import express from "express";
import dotenv from "dotenv";
import connectedDB from "./db/connection.js";
import todoRouter from "./routes/todo.routes.js";
import userRoute from "./routes/user.routes.js";
import cors from "cors";
const app = express();
dotenv.config()

connectedDB();

const PORT=process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ exteded: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE '],
    allowedHeaders: ['Content-Type', 'Authorization']
}
));
app.use("/todo", todoRouter);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
    
});