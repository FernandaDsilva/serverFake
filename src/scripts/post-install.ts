import * as Knex from 'knex';
import KnexConfig from '../../knexfile';
async function createDatabase() {
  try {
    // connects with the server and create a database
    const config = await KnexConfig();
    config.connection['database'] = null;
    const knex = Knex(config);
    console.dir(config, knex)
    await knex.raw(`CREATE DATABASE server_fake;`);
    await knex.destroy();
    console.log(':white_check_mark:', `Database (server_fake) created!`);
    // connects with the database and install extension
    const dbConfig = await KnexConfig();
    const dnConn = Knex(dbConfig);
    await dnConn.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await dnConn.destroy();
    console.log(':white_check_mark:', `Database Extensions installed!`);
  } catch (err) {
    console.log(':rotating_light:', err.message);
    process.exit(0);
  }
}
createDatabase();