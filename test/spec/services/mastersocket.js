'use strict';

describe('Service: mastersocket', function () {

  // load the service's module
  beforeEach(module('slofilmsFeApp'));

  // instantiate service
  var mastersocket;
  beforeEach(inject(function (_mastersocket_) {
    mastersocket = _mastersocket_;
  }));

  it('should do something', function () {
    expect(!!mastersocket).toBe(true);
  });

});
