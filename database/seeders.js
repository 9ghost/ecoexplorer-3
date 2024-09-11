import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Activity from '../models/activity.js';
import Destination from '../models/destination.js';

async function up() {
  const file = resolve('database', 'seeders.json');

  const seed = JSON.parse(readFileSync(file));

  for (const destination of seed.destinations) {
    await Destination.create(destination);
  }
  for (const activity of seed.activities) {
    await Activity.create(activity);
  }
}


export default { up };