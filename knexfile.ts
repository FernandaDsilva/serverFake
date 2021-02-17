import { resolve } from "path";
import { knexSnakeCaseMappers } from "objection";
export default async () => {
  const configuration = await fetchConfiguration(process.env.NODE_ENV);
  return {
    ...configuration,
    migrations: {
      tableName: "migrations",
      extension: "ts",
      directory: resolve(__dirname, "./src/migrations"),
    },
    seeds: {
      directory: resolve(__dirname, "./src/seeds"),
      loadExtensions: [".ts"],
    },
    ...knexSnakeCaseMappers(),
  };
};
async function fetchConfiguration(env) {
  //console.dir(env);
  // if (env === "development") {
  // console.dir(env);
  return {
    client: "pg",
    connection: process.env.NX_DB_URL || {
      port: 5432,
      host: "localhost",
      database: "server_fake",
      user: "postgres",
      password: "pass123",
    },
    pool: {
      min: Number(process.env.NX_DB_POLL_MIN || 0),
      max: Number(process.env.NX_DB_POLL_MAX || 10),
    },
  };
  // }
  // TODO: implement (staging and production)
  return {};
}