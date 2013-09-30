describe('Plugin', function() {
  var plugin;

  beforeEach(function() {
    plugin = new Plugin({});
  });

  it('should be an object', function() {
    expect(plugin).to.be.ok;
  });

  it('should has #optimize method', function() {
    expect(plugin.optimize).to.be.an.instanceof(Function);
  });

  it('should compile and produce valid result', function(done) {
    var content = '#first { font-size: 14px; color: #b0b; }';
    var expected = '#first{font-size:14px;color:#b0b}';

    plugin.optimize({data: content, path: ''}, function(error, result) {
      expect(error).not.to.be.ok;
      expect(result.data).to.equal(expected);
      done();
    });
  });
});
