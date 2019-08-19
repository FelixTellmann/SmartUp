import validator from 'validator';

validator.filter = function (data, keyObject) {
  return Object.keys(data).reduce((object, key) => {
    Object.keys(keyObject).forEach(matchingKey => {
      if (key === matchingKey) {
        object[key] = data[key];
      }
    });
    return object;
  }, {});
};

export default validator;