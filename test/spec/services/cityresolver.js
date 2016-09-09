'use strict';

describe('Service: cityResolver', function () {

  // load the service's module
  beforeEach(module('slofilmsFeApp'));

  // instantiate service
  var cityResolver;
  beforeEach(inject(function (_cityResolver_) {
    cityResolver = _cityResolver_;
  }));

  it('should do something', function () {
    expect(!!cityResolver).toBe(true);
  });

});
