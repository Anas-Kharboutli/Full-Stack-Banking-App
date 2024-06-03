import express from'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import accountRoute from './routes/account.route.js';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => console.log("MongoDB is Connected !"))
.catch((error) => console.log(error));


const __dirname = path.resolve();

app.use('/api', accountRoute);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

const port = 3000;
app.listen(port, console.log(`Server running on port: ${port}`));
