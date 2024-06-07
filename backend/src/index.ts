import dotenv from "dotenv";
import { app } from "./app";
import { checkRequiredEnvVars } from "./utils";

dotenv.config();

const start = async (): Promise<void> => {
  try {
    checkRequiredEnvVars();

    const PORT: number = parseInt(process.env.PORT!, 10) || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
