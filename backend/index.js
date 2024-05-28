import express from "express";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

const app = express();
const port = 5005;

app.use(express.json());
app.use(cors());

// Use the user route
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});