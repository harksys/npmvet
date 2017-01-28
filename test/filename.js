
/**
 * filename
 *
 * Extremely quick helper to get a file name
 * and extension from a path.
 *
 * @param  string path File path
 * @return string      file name
 */
module.exports = function(path) {
  return path.split('/')
             .pop();
};