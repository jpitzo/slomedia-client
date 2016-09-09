'use strict';

describe('Service: controlEvents', function () {

  // load the service's module
  beforeEach(module('slofilmsFeApp'));

  // instantiate service
  var controlEvents;
  beforeEach(inject(function (_controlEvents_) {
    controlEvents = _controlEvents_;
  }));

  it('should do something', function () {
    expect(!!controlEvents).toBe(true);
  });

});
