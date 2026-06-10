import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";


// routers
import authRouter from "./routes/auth.route.js";
import interviewRoute from "./routes/interview.route.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    headers: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.get("/", (req, res) => {
  res.send("Hello, SkillSyncAI!");
});

// routers
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRoute);


export default app;
