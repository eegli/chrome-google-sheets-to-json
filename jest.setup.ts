// Each setupFile will be run once per test file. Since every test
// runs in its own environment, these scripts will be executed in the
// testing environment immediately before executing the test code
// itself.

global.mockForV3 = require('./test-helper').default;

Object.assign(global, require('jest-chrome'));
