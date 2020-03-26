#CryptoCola

## Table of Contents

## About

CryptoCola is a DApp based on smart contracts in Ethereum. People can produce their own colas, sell thier colas or buy colas. They can even mix two colas to get a new one. Every cola has a cooldown time, within the cooldown time they can do nothing. The owner of the contract can have all benefit by producing new cola for users. The owner can also set the cooldown time or transfer the contract to another one. React-App is used as the front-end interface of the DApp.

## Installing
To **install**, you should first install nodeJS. To do that, you may use nvm to control the versions of nodeJS.
```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
exec bash
nvm install node
```
For more details, [the github page](https://github.com/nvm-sh/nvm) of nvm and [this website](https://www.cyberithub.com/install-nvm-for-node-js/) can help.

In order to run smart contract, you can deploy the contracts to the main network of Ethereum or use ganacha and truffle to simulate. To do that, using npm to install them
```sh
npm install -g truffle
npm install -g ganache-cli
```
At last, enter the root direction of CryptoCola and install all dependcies 
```sh
npm install
```

Beside the smart contracts part, the front-end interface also need many modulos and dependcies.
```sh
cd client
npm install
```

## Usage
First, start ganache and remember key words. Using these key word to import all accounts.
```sh
ganache-cli
```
You need first change the variable `owner` in ColaFactory.sol to the owner's wallet address. Then using truffle to compile and deploy all contracts.
```sh
truffle compile
truffle migrate
```
Remember the contract address of ColaPresentation.

Enter the client directory and start the server.
```sh
cd client
npm start
```
Change the contract address in all these four javascript file: Mating.js, Show.js, Buy.js, Sell.js to the contract address of ColaPresentation. This need to be done every time you re-deploy the contracts.

Open your browser and install metamask. According the information in truffle.js to set a custmized network and connect to it. Then import all accounts using the key words.
