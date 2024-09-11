import Database from './database.js';

async function up() {
  const db = await Database.connect();
  
  const destinationSQL = `
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image_url TEXT,
      description TEXT
    )
    `;
    
  const activitySQL = `
    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      destination_id INTEGER,
      FOREIGN KEY (destination_id) REFERENCES destinations(id)
    )
  `;
    
  await db.run(destinationSQL);
  await db.run(activitySQL);
}

export default { up };