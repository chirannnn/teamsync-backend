import app from "./app";
import { ENV } from "./config/env";
import { connectToDB } from "./config/db";

const startServer = async () => {
  await connectToDB();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
  });
};

startServer();
