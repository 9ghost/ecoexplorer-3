import { Database } from 'sqlite-async';
import { resolve } from 'node:path';

const dbFile = resolve('database', 'db.sqlite');

async function connect() { 
  return Database.open(dbFile);
}

export default { connect };
