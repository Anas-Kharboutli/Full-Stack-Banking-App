import express from'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import accountRoute from './routes/account.route.js';

const app = express();
app.use(express.json());
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => console.log("MongoDB is Connected !"))
.catch((error) => console.log(error));


app.use('/api', accountRoute);


const port = 8080;
app.listen(port, console.log(`Server running on port: ${port}`));