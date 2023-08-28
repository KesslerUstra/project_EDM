import { runningAlghoritm } from "../functions/edm/base";

self.onmessage = function (e) {
  const { type, payload } = e.data;
  if (type === "runAlgorithm") {
    const { data, limits } = payload;
    const results = {};
    self.postMessage({ type: "algorithmResult", payload: results });
  }
};