const checkRequiredEnvVars = (): void => {
  const requiredEnvVars: string[] = ['PORT'];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is missing.`);
    }
  });
};

export { checkRequiredEnvVars };
