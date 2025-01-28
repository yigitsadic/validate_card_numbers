import { isMainThread, parentPort, workerData } from "node:worker_threads";

const creditCardNumbers = Array.of(
  "4242424242424242",
  "4000056655665556",
  "5555555555554444",
  "2223003122003222",
  "5200828282828210",
  "5105105105105100",
  "378282246310005",
  "371449635398431",
  "6011111111111117",
  "6011000990139424",
  "6011981111111113",
  "3056930009020004",
  "36227206271667",
  "6555900000604105",
  "3566002020360505",
  "6200000000000005",
  "6200000000000047",
  "6205500000000000004"
);

if (!isMainThread) {
  const { port } = workerData;
  const baseURL = `http://localhost:${port}`;
  const buildURL = (cardNumber) =>
    baseURL.concat(`/validate_card/${cardNumber}`);

  const buildRequest = (cardNumber) =>
    fetch(buildURL(cardNumber), {
      headers: { "Content-Type": "application/json" },
    });
  const toJSON = (response) => response.json();
  const logValidationResult =
    (cardNumber) =>
    ({ valid }) =>
      console.log(`${cardNumber} is ${valid}`);

  parentPort.once("message", (msg) => {
    if (msg === "start my dear") {
      const promises = creditCardNumbers.map((cardNumber) =>
        buildRequest(cardNumber)
          .then(toJSON)
          .then(logValidationResult(cardNumber))
      );

      Promise.all(promises).then(() => {
        parentPort.postMessage("Finish my love");
      });
    }
  });
}
