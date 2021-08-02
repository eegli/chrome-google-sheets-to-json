// @ts-nocheck

// The chrome.scripting API is not yet available in jest-chrome, so we need to manually mock it here
const f = function () {};

global.chrome = {
  scripting: {
    executeScript: f
  }
};

Object.assign(global, require('jest-chrome'));
