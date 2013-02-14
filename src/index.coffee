cleanCSS = require 'clean-css'
sysPath = require 'path'

module.exports = class CleanCSSMinifier
  brunchPlugin: yes
  type: 'stylesheet'

  constructor: (@config) ->
    @options = @config?.plugins?.cleancss ? {}

  optimize: (data, path, callback) =>
    try
      optimized = cleanCSS.process data, @options
    catch err
      error = "CSS minify failed on #{path}: #{error}"
    process.nextTick ->
      callback error, (optimized or data)
