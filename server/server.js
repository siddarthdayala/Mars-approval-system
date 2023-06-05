import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import passportConfig from './config/passport.js';
import connect from './database/mongdb.js';
import routes from './routes/index.js';

import UploadFileRoute from "./routes/UploadFileRoute.js";
import { fileURLToPath } from 'url';
import path from 'path';




dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
app.use(express.static(__dirname + '/public/uploads'));

passportConfig(passport);


app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/', routes);



app.use(UploadFileRoute)



await connect();



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});






