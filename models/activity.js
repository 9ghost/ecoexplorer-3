import Database from '../database/database.js';


export default {
  async create({ name, destination_id }) {
    const db = await Database.connect();
    const sql = `
      INSERT INTO
        activities (name, destination_id)
      VALUES
        (?, ?)
    `;
    const { lastID } = await db.run(sql, [name, destination_id]);
    return await this.readById(lastID);
  },

  async read(destinationId) {
    const db = await Database.connect();
    const sql = 'SELECT * FROM activities WHERE destination_id = ?';
    return await db.all(sql, [destinationId]);
  },

  async readById(id) {
    const db = await Database.connect();
    const sql = 'SELECT * FROM activities WHERE id = ?';
    return await db.get(sql, [id]);
  },

  async update({ id, name }) {
    const db = await Database.connect();
    const sql = `
      UPDATE
        activities
      SET
        name = ?
      WHERE
        id = ?
    `;
    await db.run(sql, [name, id]);
    return this.readById(id);
  },

  async remove(id) {
    const db = await Database.connect();
    const sql = 'DELETE FROM activities WHERE id = ?';
    await db.run(sql, [id]);
  }
};
