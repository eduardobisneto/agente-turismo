// Keeps the last uncaught server error around so callers that only see a
// generic 500 response (e.g. after h3 swallows a thrown error) can still log
// the real cause. Import for the side effect of installing the listeners.

let lastCapturedError: unknown;

function capture(error: unknown) {
  lastCapturedError = error;
}

export function consumeLastCapturedError(): unknown {
  const error = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}

if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", capture);
  process.on("unhandledRejection", capture);
}
