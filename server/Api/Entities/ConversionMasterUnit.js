import validator from '../../validation';

export default class ConversionMasterUnit {
  constructor(data = {}, update = false) {
    const defaults = {
      name: '',
      abbreviation: null,
      created_at: new Date(),
      modified_at: new Date(),
    };
    
    if (update) {
      delete defaults.created_at;
    }
    
    Object.assign(this, { ...defaults, ...validator.filter(data, defaults), modified_at: new Date() });
  }
  
  static apiURI() { return 'conversion_master_units';}
  
  static apiDatabaseTable() { return 'conversion_master_units';}
  
  static apiDatabaseId() { return 'conversion_master_unit_id';}
  
}