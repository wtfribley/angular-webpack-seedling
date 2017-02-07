//
// Define a helper which constructs absolute paths given a path relative to the project root.
//
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

module.exports = {
  /**
   * Given a path relative to the project root directory, return an absolute path. Each element in
   * the relative path should be given as a separate argument
   *
   * @param  {string} args One or more path elements.
   * @return {string} An absolute path.
  */
  root: function root() {
    var args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
  }
};
