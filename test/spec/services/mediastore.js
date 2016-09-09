'use strict';

describe('Service: mediaStore', function () {

  // load the service's module
  beforeEach(module('slofilmsFeApp'));

  // instantiate service
  var mediaStore;
  beforeEach(inject(function (_mediaStore_) {
    mediaStore = _mediaStore_;
  }));

  it('should do something', function () {
    expect(!!mediaStore).toBe(true);
  });

});
