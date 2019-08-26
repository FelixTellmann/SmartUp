import validator from '../../validation';

export default class UiSetting {
  constructor(data = {}, update = false) {
    const defaults = {
      name: null,
      created_at: new Date(),
      modified_at: new Date(),
    };
    
    if (update) {
      delete defaults.created_at;
    }
    
    Object.assign(this, { ...defaults, ...validator.filter(data, defaults), modified_at: new Date() });
  }
  
  static apiURI() { return 'UiSetting';}
  
  static apiDatabaseTable() { return 'ui_settings';}
  
  static apiDatabaseId() { return 'ui_setting_id';}
}