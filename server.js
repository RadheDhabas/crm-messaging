import express from 'express';
import dotenv from "dotenv";
import startmessage from './routes/startmessage.js';
import webhook from './routes/webhook.js';

// import cors from "cors";
dotenv.config();

const app = express();
// app.use(cors());

app.use(express.json()); 

const PORT =  process.env.PORT;
app.get('/', (req, res) => {
  res.send('OK');
});

app.use('/webhook',webhook);
app.use('/', startmessage);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
