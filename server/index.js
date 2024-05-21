import express from'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import accountRoute from './routes/account.route.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => console.log("MongoDB is Connected !"))
.catch((error) => console.log(error));


app.use('/api', accountRoute);


const port = 8080;
app.listen(port, console.log(`Server running on port: ${port}`));