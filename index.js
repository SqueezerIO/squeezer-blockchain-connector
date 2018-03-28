
const reqPromise = require('request-promise');

let globalPool = {};

function isInitialized() {
  if(globalPool.key === null) {
    return false;
  };
  if(globalPool.currencyType === null) {
    return false;
  };
  if(globalPool.address === null) {
    return false;
  };
  return true;
}

exports.init = (initData) => {
  globalPool.key = initData.key;
  globalPool.currencyType = initData.currencyType;
  }
  
exports.setGatewayAddress = (address) => {
  globalPool.gatewayAddress = address;
  }
  
  exports.createWallet = () => {
    let reqOptions =  {
      method: 'POST',
      uri: `${globalPool.gatewayAddress}/v1/wallets/createWallet`,
      body: {
        accessKey: globalPool.key,
        currencyType: globalPool.currencyType
      },
      json: true 
    };
    return new Promise((resolve, reject) => {
      reqPromise(reqOptions)
      .then((data) => {
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      })
    })
  };

  exports.listAllWallets = () => {
    let reqOptions =  {
      method: 'GET',
      uri: `${globalPool.gatewayAddress}/v1/wallets/listAllWallets`,
      json: true // Automatically stringifies the body to JSON
    };
    return new Promise((resolve, reject) => {
      reqPromise(reqOptions)
      .then((data) => {
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      })
    })
  }

  exports.getBalance = (walletID) => {
    let reqOptions =  {
      method: 'POST',
      uri: `${globalPool.gatewayAddress}/v1/blockchainlink/getEthBalance`,
      body: {
        address : walletID
      },
      json: true // Automatically stringifies the body to JSON
    };
    return new Promise((resolve, reject) => {
      reqPromise(reqOptions)
      .then((data) => {
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      })
    })
  }

