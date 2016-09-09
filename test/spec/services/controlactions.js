'use strict';

describe('Service: controlActions', function () {

  // load the service's module
  beforeEach(module('slofilmsFeApp'));

  // instantiate service
  var controlActions;
  beforeEach(inject(function (_controlActions_) {
    controlActions = _controlActions_;
  }));

  it('should do something', function () {
    expect(!!controlActions).toBe(true);
  });

});
