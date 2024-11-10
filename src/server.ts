/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(
        `Library Management Server is running on port ${config.port}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`😈 unhandledRejection is detected, shutting down the server`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected, shutting down the server`);
  process.exit(1);
});
