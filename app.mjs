import express from "express";
import { reverse } from "ramda";
import {
  canDivideWith10,
  toArray,
  sumAllAndDoubleEverySecond,
  turnAllToIntegers,
} from "./fns.mjs";

const app = express();
const port = 4523;

const prepareResponse = (res) => (valid) => res.json({ valid });

app.get("/validate_card/:cardNumber", (req, res) => {
  const respondWithJSON = prepareResponse(res);

  Promise.resolve(req.params.cardNumber)
    .then(reverse)
    .then(toArray)
    .then(turnAllToIntegers)
    .then(sumAllAndDoubleEverySecond)
    .then(canDivideWith10)
    .then(respondWithJSON);
});

app.listen(port, () => {
  console.log(`🚀 Started on port=${port}`);
});
