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
### Get all wallets

```
blockchainConnector.listAllWallets()
```

#### Description

Get info about wallets

#### Parameters
No parameters needed
#### Return format

A JSON object that contain informations about all wallets

#### Example

<b>Request</b>
```
blockchainConnector.listAllWallets()
	.then((response) => {
		console.log(console);
	})
	.catch((error) => {
		console.log(error)
	});
```
<b>Result</b>
```
[
  {
    "_id": "5abd3817b6542e162b4788d5",
    "WalletID": "7931462c-7adf-4816-8259-ca99874c38fb",
    "Address": "0xa37875c303786525a767F0d3f9F4A3E94989eC87",
    "CurrencyType": "ETH",
    "__v": 0
  },
  ...
]
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
<b>Result</b>
```
"1.895178899999999998"
```
### Send transaction

```
blockchainConnector.sendTransaction(transactionData)
```

#### Description

Send coins from one wallet to another

#### Parameters of transactionData

* <b>toWallet</b> - wallet's address
* <b>amount</b> - amount of coins
* <b>keyStore</b> - fromWallet's keystore
* <b>accessKey</b> - api-key used to generate wallet

#### Return format

A JSON object that contain informations about that transaction

#### Example

<b>Request</b>
```
blockchainConnector.sendTransaction(transactionData)
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(error);
	});
```

<b>Result</b>
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





