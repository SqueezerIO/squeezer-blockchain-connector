### squeezer-blockchain-connector
Agnostic blockchain connector

The main scope for adding the connector is to unify all the current blockchains data assets into a single normalized API interface , therefore you can build blockchain apps easily without digging into all blockchain  infrastructures 

### Install

`npm install squeezer-blockchain-connector --save`

Tasks list:

- [x] Add base functionality
- [ ] Integrate BTC
- [ ] Integrate ETH
- [ ] Integrate SQZR
- [ ] Integrate BNB
- [ ] Implement sandbox for testing
- [ ] Add support to send/sign transactions

### Initialize

```
const blockchainConnector = require('squeezer-blockchain-connector').init({ 
   key : 'squeezer-key', 
   environment : 'test',
   currencyType : 'ETH'
});
```
## Using connector

### Create new Wallet
```
blockchainConnector.createWallet();
```
#### Description
Create new wallet adress
#### Parameters
No parameters needed
#### Return format
A JSON object with accesskey, walletID, keystore and adress of wallet
#### Example
<b>Request</b>
```
blockchainConnector.createWallet()
	.then((response) => {
		console.log(console);
	})
	.catch((error) => {
		console.log(error)
	})
```
<b>Result</b>
```
{
  "walletID": "06667b48-6402-435a-af47-628a65882696",
  "accesskey": "3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4",
  "address": "0x5E73b574dA086b2aD3D6c61a78EcFD4FF916f282",
  "keyStore": {
    "version": 3,
    "id": "06667b48-6402-435a-af47-628a65882696",
    "address": "5e73b574da086b2ad3d6c61a78ecfd4ff916f282",
    "crypto": {
      "ciphertext": "faf240e3a03771f3a453b1beb50e9a4335cc27f2b93e5da3ae565c3d52db149e",
      "cipherparams": {
        "iv": "8b4d57d65c90a0c01808ec6f76367b2b"
      },
      "cipher": "aes-128-ctr",
      "kdf": "scrypt",
      "kdfparams": {
        "dklen": 32,
        "salt": "4f3ed347f6b43e795a68eac3a892c7d289f5fa5282087501ed8dddf882f35900",
        "n": 262144,
        "r": 8,
        "p": 1
      },
      "mac": "04ac089467501e09c66af1394e311816efa01fa04be1e80897d650b19af45418"
    }
  }
}
```
### Get balance
```
blockchainConnector.getBalance(walletAdress);
```
#### Description
Get balance of specified address
#### Parameters

* <b>walletAddress</b> - wallet address

#### Return format
A string with amount of wallet
#### Example
<b>Request</b>
```
blockchainConnector.getBalance(walletAdress)
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(error);
	});
```
<b>Body</b>
```
{
  "walletAddress": "0xc1f9e93081e7797ec3ef2134e0e656b2c8d542f1",
  "currencyType": "ETH",
  "network" : "rinkeby"
}
```
<b>Response</b>
```
"1.895178899999999998"
```
### Send transaction

```
blockchainConnector.sendTransaction(transactionData)
```

#### Description

Send coins from one wallet to another

#### Parameters

* <b>toWallet</b> - wallet's address
* <b>currencyType</b> - what type of wallet want
* <b>amount</b> - amount of coins
* <b>keyStore</b> - fromWallet's keystore
* <b>accessKey</b> - api-key used to generate wallet
* <b>network</b> - if use test environment should be passed network (rinkeby, ropsten, kovan - ETH and bitcoin-testnet -BTC)

#### Return format

A JSON object that contain informations about that transaction

#### Example

<b>Request</b>
```
POST /v1/wallets/SendTransaction
```
<b>Body</b>
```
{
  "toWallet": "0x8a5cf6d5e86ebfe3e1ab573d1eafc299c04c8cf9",
  "currencyType": "ETH",
  "amount": 0.001,
  "keyStore": {
    "version": 3,
    "id": "0af46c1e-4d02-4f9b-af62-ec358612a3c2",
    "address": "c1f9e93081e7797ec3ef2134e0e656b2c8d542f1",
    "crypto": {
      "ciphertext": "cc3bb088bd53ea45172b0ab5f01c9e28e6b7b3743a589a4437844b9fce922888",
      "cipherparams": {
        "iv": "55b1aeeffa8ce3ffe24a488e58174c0f"
      },
      "cipher": "aes-128-ctr",
      "kdf": "scrypt",
      "kdfparams": {
        "dklen": 32,
        "salt": "0c990d41edcf0d8f5541713ef0e2f0629366ffadb8190b0d3a32755488de6877",
        "n": 262144,
        "r": 8,
        "p": 1
      },
      "mac": "4ea78c87318dbe87ac4e109845301d248d4caf25f82882dff1fbaa1fe4b3d70c"
    }
  },
  "accessKey": "3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4",
  "network" : "rinkeby"
}
```
<b>Response</b>
```
{
  "transaction": {
    "transaction": "0xad63f8fc7db990058ef3ec6433190cbc5b0e0af670be79c49a70d8e1daacfb29",
    "transactionStatus": 0,
    "_id": "5ab2b1fd6e578b3ae275e351",
    "__v": 0
  }
}
```
### Get transaction

```
POST /v1/blockchainlink/GetTransaction
```

#### Description

Get info about one transaction

#### Parameters

* <b>transactionHash</b> - transaction hash returned by SendTransaction
* <b>currencyType</b> - what type of wallet want
* <b>network</b> - if use test environment should be passed network (rinkeby, ropsten, kovan - ETH and bitcoin-testnet -BTC)

#### Return format

A JSON object that contain informations about transaction

#### Example

<b>Request</b>
```
POST /v1/wallets/GetTransaction
```
<b>Body</b>
```
{
  "transactionHash": "0xad63f8fc7db990058ef3ec6433190cbc5b0e0af670be79c49a70d8e1daacfb29",
  "currencyType" : "ETH",
  "network" : "rinkeby"
  new
}
```
<b>Response</b>
```
{
  "blockHash": "0xb589d75b759436e43381dc30f89a792f6f7bace421bf04f5eb1f2cca7c8e0628",
  "blockNumber": 1972693,
  "from": "0xc1f9e93081e7797ec3ef2134e0e656b2c8d542f1",
  "gas": 21000,
  "gasPrice": "1000000000",
  "hash": "0xad63f8fc7db990058ef3ec6433190cbc5b0e0af670be79c49a70d8e1daacfb29",
  "input": "0x",
  "nonce": 11,
  "to": "0x8a5cf6d5e86ebfe3e1ab573d1eafc299c04c8cf9",
  "transactionIndex": 9,
  "value": "1000000000000000",
  "v": "0x1b",
  "r": "0xf62198309971d6c3725f2f0cddc7eb60da5715fed89b597d4a273322313aebe4",
  "s": "0x5b86ac969b259c73d7fccc3dec9f28fdbdc024a8f72c842939baeb198eb9b6b1"
}
```




