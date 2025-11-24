import cors from "cors";
import express, { type Express } from "express";
import pino from "pino";
import { env } from "./common/utils/envConfig";
import helmet from "helmet";
import requestLogger from "./common/middleware/requestLogger";
import errorHandler from "./common/middleware/errorHandler";
import router from "./router";

const logger = pino({
  transport: env.isProduction
    ? undefined
    : {
        target: "pino-pretty",
      },
});
const app: Express = express();

// -- CORE MIDDLEWARE --

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: env.isProduction ? env.CORS_ORIGIN : "*",
    credentials: true,
  })
);
app.use(helmet());

// MIDDLEWARES

app.use(requestLogger);

// Router
app.use("/api", router);

app.use(errorHandler());

export { app, logger };
