import { configDotenv } from "dotenv";
import express, { Express, Request, Response } from "express";
import { dataSource } from "./src/database/ormconfig";
import AuthRouter from "./src/modules/auth";
import cors from 'cors';
import morgan from 'morgan';


configDotenv();

dataSource.initialize()

    .then(() => {
      console.log("Database connection established successfully.");
    })
    .catch((error) => console.log(error))

const app: Express = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use('/api', AuthRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
