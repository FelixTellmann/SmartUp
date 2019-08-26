import validator from '../../validation';

export default class InventoryItem {
  constructor(data = {}, update = false) {
    const defaults = {
      name: null,
      conversion_unit_id: null,
      supplier_id: null,
      description: null,
      created_at: new Date(),
      modified_at: new Date(),
    };
    
    if (update) {
      delete defaults.created_at;
    }
    Object.assign(this, { ...defaults, ...validator.filter(data, defaults), modified_at: new Date() });
  }
  
  static apiURI() { return 'inventory_item';}
  
  static apiDatabaseTable() { return 'inventory_items';}
  
  static apiDatabaseId() { return 'inventory_item_id';}
}