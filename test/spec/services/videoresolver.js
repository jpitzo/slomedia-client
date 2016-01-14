'use strict';

describe('Service: videoResolver', function () {

  // load the service's module
  beforeEach(module('slofilmsFeApp'));

  // instantiate service
  var videoResolver;
  beforeEach(inject(function (_videoResolver_) {
    videoResolver = _videoResolver_;
  }));

  it('should do something', function () {
    expect(!!videoResolver).toBe(true);
  });

});
