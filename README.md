# CryptoCola

## Table of Contents

- [About](#About)
- [Installing](#Installing)
- [Usage](#Usage)

## About

CryptoCola is a DApp based on smart contracts in Ethereum. People can produce their colas, sell their colas or buy colas. They can even mix two colas to get a new one. Every cola has a cooldown time, within the cooldown time they can do nothing. The owner of the contract can have all benefit by producing new cola for users. The owner can also set the cooldown time or transfer the contract to another one. React-App is used as the front-end interface of the DApp.

The file structure is
```sh
.
├── build
├── client
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── README.md
│   └── src
│       ├── App.js
│       ├── Buy.js
│       ├── ColaList.js
│       ├── contracts -> ../../build/contracts
│       ├── index.html
│       ├── index.js
│       ├── Mating.js
│       ├── Navigtor.js
│       ├── Sell.js
│       ├── serviceWorker.js
│       ├── Show.js
│       └── welcome.js
├── contracts
│   ├── ColaFactory.sol
│   ├── ColaMixture.sol
│   ├── ColaOwnership.sol
│   ├── ColaPresentation.sol
│   └── Migrations.sol
├── migrations
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── test
└── truffle-config.js
```

## Installing
To **install**, you should first install nodeJS. To do that, you may use `nvm` to control the versions of nodeJS.
```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
exec bash
nvm install node
```
For more details, [the Github page](https://github.com/nvm-sh/nvm) of nvm and [this website](https://www.cyberithub.com/install-nvm-for-node-js/) can help.

To run smart contracts, you can deploy the contracts to the main network of Ethereum or use `ganacha` and `truffle` to simulate. To do that, using `npm` to install them
```sh
npm install -g truffle
npm install -g ganache-cli
```
At last, enter the **root** direction of CryptoCola and install all dependencies.
```sh
npm install
```

The front-end interface also needs many modules and dependencies.
```sh
cd client
npm install
```

You also need to install MetaMask for your browser. The account in MetaMask will be you identifiers.

## Usage
First, start `ganache` and remember the mnemonic. Using them as the account seed phrase to import all accounts.
```sh
ganache-cli
```
Then the code need to be modified. The variable `owner` in **ColaFactory.sol** should change to the owner's wallet address. Then using `truffle` to compile and deploy all contracts.
```sh
truffle compile
truffle migrate
```
Remember **the contract address of ColaPresentation**.

Enter the **client** directory and start the server.
```sh
cd client
npm start
```

Change the contract address in all these four javascript files: **Mating.js**, **Show.js**, **Buy.js**, **Sell.js** to the contract address of ColaPresentation. This need to be done every time you re-deploy the contracts.

Open your browser and install **metamask**. According to the information in **truffle-config.js** to set a customized network and connect to it. Then import all accounts using the seed phrase.
