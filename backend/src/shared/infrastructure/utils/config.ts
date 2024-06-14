interface ServerConfig {
  port: number;
}

interface Config {
  server: ServerConfig;
}

const config: Config = {
  server: {
    port: parseInt(process.env.PORT!, 10) || 4000,
  },
};

export { config };
