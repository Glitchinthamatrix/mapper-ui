export default {
  setItem(key, value) {
    localStorage.setItem(key, value);
  },

  getItem(key) {
    return localStorage.getItem(key);
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },

  itemExists(key) {
    return this.getItem(key) !== null;
  },
};
