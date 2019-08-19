import validator from 'validator';

export default class RecipeInstruction {
  constructor(data) {
    const defaultValues = {
      name: '',
      inventory_item_type_id: null,
      conversion_unit_id: null,
    };
    
    Object.assign(this, { ...defaultValues, ...data, modified_at: new Date() });
  }
}