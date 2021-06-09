import set from 'lodash/set';

export default (data = {}) => {
  const out = {};

  Object.getOwnPropertyNames(data)
    .forEach((name) => {
      const keyLength = Object.keys(data[name]).length;
      let value = data[name] && data[name].value;
      if (keyLength > 1) value = data[name];
      const setItems = [out, name, value];
      set(...setItems);
    });

  return out;
};
