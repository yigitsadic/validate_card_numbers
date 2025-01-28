import express from "express";
import { pipe, reverse } from "ramda";
import {
  canDivideWith10,
  toArray,
  sumAllAndDoubleEverySecondElement,
  turnToIntegers,
  toJSON,
} from "./fns.mjs";
import { Worker } from "node:worker_threads";

const app = express();
const port = 4523;
const worker = new Worker("./worker.mjs", { workerData: { port } });

app.get("/validate_card/:cardNumber", (req, res) => {
  pipe(
    reverse,
    toArray,
    turnToIntegers,
    sumAllAndDoubleEverySecondElement,
    canDivideWith10,
    toJSON(res)
  )(req.params.cardNumber);
});

const srv = app.listen(port, () => {
  console.log(`🚀 Started on port=${port}`);

  worker.postMessage("start my dear");
});

worker.once("message", () => srv.close());
