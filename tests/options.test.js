const { expect } = require('chai');
const sinon = require('sinon');
const chrome = require('sinon-chrome');

const options = require('../src/options');

describe('options.js', () => {
  before(() => {
    global.chrome = chrome;
  });

  afterEach(() => {
    chrome.reset();
  });

  after(() => {
    delete global.chrome;
  });

  describe('settingsForm submit event listener', () => {
    it('should save host settings to chrome.storage.sync', () => {
      const host = 'example.com';
      const message = 'Hello';
      const color = '#ff0000';

      document.getElementById('host').value = host;
      document.getElementById('message').value = message;
      document.getElementById('color').value = color;

      const event = new Event('submit');
      document.getElementById('settingsForm').dispatchEvent(event);

      expect(chrome.storage.sync.get.calledOnce).to.be.true;
      expect(chrome.storage.sync.set.calledOnce).to.be.true;
      expect(chrome.storage.sync.set.calledWith({
        hosts: {
          [host]: { message, color }
        }
      })).to.be.true;
    });
  });

  describe('chrome.storage.sync.get and chrome.storage.sync.set', () => {
    it('should get and set host settings correctly', () => {
      const host = 'example.com';
      const message = 'Hello';
      const color = '#ff0000';
      const hosts = { [host]: { message, color } };

      chrome.storage.sync.get.yields({ hosts });
      chrome.storage.sync.set.yields();

      chrome.storage.sync.get('hosts', (data) => {
        expect(data.hosts).to.deep.equal(hosts);
      });

      chrome.storage.sync.set({ hosts }, () => {
        expect(chrome.storage.sync.set.calledOnce).to.be.true;
        expect(chrome.storage.sync.set.calledWith({ hosts })).to.be.true;
      });
    });
  });
});
