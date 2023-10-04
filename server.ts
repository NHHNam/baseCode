import app from "./app";

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () =>
  console.log(`App Ecommerce CellphoneS listening on port ${PORT}`)
);

process.on("SIGINT", () =>
  server.close(() => console.log("Exit Server Express"))
);
