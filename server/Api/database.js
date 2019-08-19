/*
getEntities(apiEndpoint);
getEntityById(apiEndpoint);
postEndpointBy(apiEndpoint);
patchEndpointById(apiEndpoint);
deleteEndpointById(apiEndpoint);
*/

class DatabaseModel {
  constructor(Entity, db) {
    this.db = db;
    this.Entity = Entity;
  }
  
  async getEntities() {
    const data = (await this.db.query(`SELECT * FROM ${this.Entity.apiDatabaseTable()}`))[0];
    if (data) {
      return data;
    } else {
      throw new Error('Data not found');
    }
  }
  
  async getEntityById(id) {
    const data = (await this.db.query(`SELECT * FROM ${this.Entity.apiDatabaseTable()} WHERE ${this.Entity.apiDatabaseId()} = ${id}`))[0][0];
    if (data) {
      return data;
    } else {
      throw new Error('Data not found');
    }
  }
  
  async createEntity(body) {
    const validatedData = new this.Entity(body);
    const data = await this.db.query(`INSERT INTO ${this.Entity.apiDatabaseTable()} SET ?`, validatedData);
    if (data) {
      return data;
    } else {
      throw new Error('Data not found');
    }
  }
  
  async updateEntity(id, body) {
    const validatedData = new this.Entity(body, true);
    const data = await this.db.query(`UPDATE ${this.Entity.apiDatabaseTable()} SET ? WHERE ${this.Entity.apiDatabaseId()} = ${id} `, validatedData);
    if (data) {
      return data;
    } else {
      throw new Error('Data not found');
    }
  }
  
  async deleteEntity(id) {
    const data = await this.db.query(`DELETE FROM ${this.Entity.apiDatabaseTable()} WHERE ${this.Entity.apiDatabaseId()} = ${id}`);
    if (data) {
      return data;
    } else {
      throw new Error('Data not found');
    }
  }
}

export default DatabaseModel;