const { expect } = require('chai');
const sinon = require('sinon');
const chrome = require('sinon-chrome');

const content = require('../src/content');

describe('content.js', () => {
  before(() => {
    global.chrome = chrome;
  });

  afterEach(() => {
    chrome.reset();
  });

  after(() => {
    delete global.chrome;
  });

  describe('chrome.runtime.onMessage', () => {
    it('should create a banner with the correct message and color', () => {
      const hostSettings = { message: 'Hello', color: 'red' };
      chrome.runtime.onMessage.dispatch({ hostSettings });

      const banner = document.getElementById('chromeExtensionBanner');
      expect(banner).to.not.be.null;
      expect(banner.textContent).to.equal('Hello');
      expect(banner.style.backgroundColor).to.equal('red');
    });

    it('should remove existing banner before creating a new one', () => {
      const hostSettings = { message: 'Hello', color: 'red' };
      const existingBanner = document.createElement('div');
      existingBanner.id = 'chromeExtensionBanner';
      document.body.appendChild(existingBanner);

      chrome.runtime.onMessage.dispatch({ hostSettings });

      const banners = document.querySelectorAll('#chromeExtensionBanner');
      expect(banners.length).to.equal(1);
      expect(banners[0].textContent).to.equal('Hello');
    });

    it('should not create a banner if message is not provided', () => {
      const hostSettings = { color: 'red' };
      chrome.runtime.onMessage.dispatch({ hostSettings });

      const banner = document.getElementById('chromeExtensionBanner');
      expect(banner).to.be.null;
    });
  });
});
