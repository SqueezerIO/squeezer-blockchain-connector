'use strict';

const request = require('request');

class BlockchainConnector {
  constructor(options) {
    const accessKey = options.accessKey;
    const environment = options.environment;

    if (!accessKey) throw new Error('missing access key');
    if (!environment) throw new Error('missing environment');

    this.request = request;
    this.environment = environment;
    this.accessKey = accessKey;

    if (environment === 'test')
      this.apiGatewayBaseUrl = 'https://p251st0hh1.execute-api.us-east-1.amazonaws.com/dev';
  }

  walletTypes(callback) {
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/types`,
      method: 'GET'
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  createWallet(options, callback) {
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/create`,
      method: 'POST',
      json: {
        type: options.type,
        accessKey: this.accessKey
      }
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  sendTransaction(options, callback) {
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/sendTransaction`,
      method: 'POST',
      json: {
        amount: options.amount,
        type: options.type,
        to: options.to,
        token: options.token,
        accessKey: this.accessKey
      }
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  getTransactions(options, callback) {
    const walletId = options.walletId;
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/${walletId}/transactions`,
      method: 'GET'
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  getBalance(options, callback) {
    const walletId = options.walletId;
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/${walletId}/balance`,
      method: 'GET'
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }
}

module.exports = BlockchainConnector;