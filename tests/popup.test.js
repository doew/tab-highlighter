const { expect } = require('chai');
const sinon = require('sinon');
const chrome = require('sinon-chrome');

const popup = require('../src/popup');

describe('popup.js', () => {
  before(() => {
    global.chrome = chrome;
  });

  afterEach(() => {
    chrome.reset();
  });

  after(() => {
    delete global.chrome;
  });

  describe('saveSettings', () => {
    it('should save host settings to chrome.storage.sync', () => {
      const host = 'example.com';
      const message = 'Hello';
      const color = '#ff0000';

      document.getElementById('hostName').textContent = host;
      document.getElementById('message').value = message;
      document.getElementById('color').value = color;

      popup.saveSettings();

      expect(chrome.storage.sync.get.calledOnce).to.be.true;
      expect(chrome.storage.sync.set.calledOnce).to.be.true;
      expect(chrome.storage.sync.set.calledWith({
        hosts: {
          [host]: { message, color }
        }
      })).to.be.true;
    });
  });

  describe('chrome.tabs.query and chrome.storage.sync.get', () => {
    it('should get and display host settings correctly', () => {
      const host = 'example.com';
      const message = 'Hello';
      const color = '#ff0000';
      const hosts = { [host]: { message, color } };

      chrome.tabs.query.yields([{ url: `http://${host}` }]);
      chrome.storage.sync.get.yields({ hosts });

      popup.init();

      expect(document.getElementById('hostName').textContent).to.equal(host);
      expect(document.getElementById('message').value).to.equal(message);
      expect(document.getElementById('color').value).to.equal(color);
    });
  });
});
