import validator from '../../validation';

export default class ConversionUnit {
  constructor(data = {}, update = false) {
    const defaults = {
      name: null,
      conversion_master_unit_id: null,
      conversion_factor: null,
      abbreviation: null,
      created_at: new Date(),
      modified_at: new Date(),
    };
    
    if (update) {
      delete defaults.created_at;
    }
    
    Object.assign(this, { ...defaults, ...validator.filter(data, defaults), modified_at: new Date() });
  }
  
  static apiURI() { return 'conversion_units';}
  
  static apiDatabaseTable() { return 'conversion_units';}
  
  static apiDatabaseId() { return 'conversion_unit_id';}
  
}