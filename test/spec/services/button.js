'use strict';

describe('Service: button', function () {

  // load the service's module
  beforeEach(module('slofilmsFeApp'));

  // instantiate service
  var button;
  beforeEach(inject(function (_button_) {
    button = _button_;
  }));

  it('should do something', function () {
    expect(!!button).toBe(true);
  });

});
