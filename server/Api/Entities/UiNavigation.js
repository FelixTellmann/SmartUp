import validator from '../../validation';

export default class UiNavigation {
  constructor(data = {}, update = false) {
    const defaults = {
      name: null,
      ui_setting_id: null,
      order: null,
      subitem: null,
      parent_item_id: null,
      created_at: new Date(),
      modified_at: new Date(),
    };
    
    if (update) {
      delete defaults.created_at;
    }
    
    Object.assign(this, { ...defaults, ...validator.filter(data, defaults), modified_at: new Date() });
  }
  
  static apiURI() { return 'UiNavigation';}
  
  static apiDatabaseTable() { return 'ui_navigation';}
  
  static apiDatabaseId() { return 'ui_navigation_id';}
}