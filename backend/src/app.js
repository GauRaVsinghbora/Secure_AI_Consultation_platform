import express from 'express';
import cookieParser from 'cookie-parser';
import { ApiError } from './utils/apiError.js';
import cors from 'cors';
const app = express();

// Using middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

// importing and using routes
import userRoutes from './routes/user.routes.js';
app.use('/api/v1/users', userRoutes);
import chatRoutes from './routes/chat.routes.js';
app.use('/api/v1/users/chat', chatRoutes);

// global error handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    // fallback for unexpected errors
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running!" });
});
// http://localhost:4001/api/v1/
export default app;