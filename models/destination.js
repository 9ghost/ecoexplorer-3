import Database from '../database/database.js';

export default {
  async create({ name, description, image_url }) {
    const db = await Database.connect();
    const sql = `
      INSERT INTO
        destinations (name,image_url, description)
      VALUES
        (?, ?,?)
    `;
    const { lastID } = await db.run(sql, [name, image_url ,description,]);
    return await this.readById(lastID);
  },

  async read() {
    const db = await Database.connect();
    const sql = 'SELECT * FROM destinations';
    return await db.all(sql);
  },

  async readById(id) {
    const db = await Database.connect();
    const sql = 'SELECT * FROM destinations WHERE id = ?';
    return await db.get(sql, [id]);
  },

  async update({ id, name, description }) {
    const db = await Database.connect();
    const sql = `
      UPDATE
        destinations
      SET
        name = ?, description = ?
      WHERE
        id = ?
    `;
    await db.run(sql, [name, description, id]);
    return this.readById(id);
  },

  async remove(id) {
    const db = await Database.connect();
    const sql = 'DELETE FROM destinations WHERE id = ?';
    await db.run(sql, [id]);
  },
  async readDestinationActivities(destinationId) {
    const db = await Database.connect();
    const sql = 'SELECT destinations.*, activities.name AS name_activitie FROM activities JOIN destinations ON activities.id = destinations.id';
    return await db.all(sql, [destinationId]);
  }
}