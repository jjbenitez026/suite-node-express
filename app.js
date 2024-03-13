import "dotenv/config";
import express from 'express';
import userRoute from "./routes/user.route.js"
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("escucha por el port 3000");
});