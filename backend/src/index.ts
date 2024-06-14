import './shared/infrastructure/utils/load-env-vars';

import { app } from './app';
import { checkRequiredEnvVars, config } from './shared';

const start = async (): Promise<void> => {
  try {
    checkRequiredEnvVars();

    const { port } = config.server;

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
