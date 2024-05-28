import express from "express";
import userRouter from "./routes/userRoute.js";
import assetRouter from "./routes/assetRoute.js";
import reqassetRouter from "./routes/requestassetRoute.js";
import historyRouter from "./routes/historyRoute.js";
import peminjamanRouter from "./routes/peminjamanRoute.js";
import mutasiRouter from "./routes/mutasiRoute.js";
import laporanRouter from "./routes/laporanRoute.js";

import cors from "cors";

const app = express();
const port = 5005;

app.use(express.json());
app.use(cors());

// Use the user route
app.use(userRouter);
app.use(assetRouter);
app.use(reqassetRouter);
app.use(historyRouter);
app.use(peminjamanRouter);
app.use(mutasiRouter);
app.use(laporanRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});