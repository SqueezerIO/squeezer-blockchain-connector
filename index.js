
const reqPromise = require('request-promise');
const config = require('./config/config');

const globalPool = {
  address : config.gateway().address,
  key: '',
  currencyType : '',
  environment : ''
};

function isInitialized() {
  if (globalPool.key === null) {
    return false;
  }
  if (globalPool.currencyType === null) {
    return false;
  }
  if (globalPool.address === null) {
    return false;
  }
  return true;
}

exports.init = (initData) => {
  globalPool.key = initData.key;
  globalPool.currencyType = initData.currencyType;
  globalPool.environment = initData.environment;
};

// Create wallet

exports.createWallet = () => {
  const reqOptions =  {
    method: 'POST',
    uri: `${globalPool.address}/v1/wallets/createWallet`,
    body: {
      accessKey: globalPool.key,
      currencyType: globalPool.currencyType
    },
    json: true
  };
  return new Promise((resolve, reject) => {
    reqPromise(reqOptions)
      .then((data) => {
        const response = {
          walletID : data.walletID,
          accesskey : globalPool.key,
          address : data.address,
          keyStore : data.keyStore
        };
        return resolve(response);
      }).catch((error) => {
        return reject(error);
      });
  });
};

// List all wallets from db

exports.listAllWallets = () => {
  const reqOptions =  {
    method: 'GET',
    uri: `${globalPool.address}/v1/wallets/listAllWallets`,
    json: true
  };
  return new Promise((resolve, reject) => {
    reqPromise(reqOptions)
      .then((data) => {
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      });
  });
};

// Get wallet's balance

exports.getBalance = (walletID) => {
  const reqOptions =  {
    method: 'POST',
    uri: `${globalPool.address}/v1/blockchainlink/getEthBalance`,
    body: {
      address : walletID
    },
    json: true
  };
  return new Promise((resolve, reject) => {
    reqPromise(reqOptions)
      .then((data) => {
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      });
  });
};

// Send transaction

exports.sendTransaction = (transactionData) => {
  const reqOptions = {};
  reqOptions.method = 'POST';
  switch (globalPool.currencyType) {
    case 'ETH':
      reqOptions.uri = `${globalPool.address}/v1/blockchainlink/sendEthereum`;
      break;
    case 'BTC':
      reqOptions.uri = `${globalPool.address}/v1/blockchainlink/sendBitcoin`;
      break;
    case 'LTC':
      reqOptions.uri = `${globalPool.address}/v1/blockchainlink/sendLiteCoin`;
      break;
    default:
      reqOptions.uri = `${globalPool.address}/v1/blockchainlink/sendEthereum`;
  }
  reqOptions.body = {
    toWallet : transactionData.toWallet,
    currencyType : globalPool.currencyType,
    amount : transactionData.amount,
    keyStore : transactionData.keyStore,
    accessKey : globalPool.key
  };
  reqOptions.json = true;
  return new Promise((resolve, reject) => {
    reqPromise(reqOptions)
      .then((data) => {
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      });
  });
};
