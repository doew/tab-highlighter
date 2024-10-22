const { expect } = require('chai');
const sinon = require('sinon');
const chrome = require('sinon-chrome');

const background = require('../src/background');

describe('background.js', () => {
  before(() => {
    global.chrome = chrome;
  });

  afterEach(() => {
    chrome.reset();
  });

  after(() => {
    delete global.chrome;
  });

  describe('chrome.runtime.onInstalled', () => {
    it('should set hosts to an empty object', () => {
      chrome.runtime.onInstalled.dispatch();
      expect(chrome.storage.sync.set.calledOnce).to.be.true;
      expect(chrome.storage.sync.set.calledWith({ hosts: {} })).to.be.true;
    });
  });

  describe('chrome.tabs.onUpdated', () => {
    it('should send hostSettings to the tab', () => {
      const tabId = 1;
      const changeInfo = { status: 'complete' };
      const tab = { url: 'http://example.com' };
      const hostSettings = { message: 'Hello', color: 'blue' };

      chrome.storage.sync.get.yields({ hosts: { 'example.com': hostSettings } });
      chrome.tabs.onUpdated.dispatch(tabId, changeInfo, tab);

      expect(chrome.tabs.sendMessage.calledOnce).to.be.true;
      expect(chrome.tabs.sendMessage.calledWith(tabId, { hostSettings })).to.be.true;
    });
  });
});
