//deploy.js
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'come ocean involve battle onion dinosaur cream oppose axis chimney size pet', //Mnemonic
  'https://rinkeby.infura.io/EUpGstKhtEWq2rhdBxbQ'
);
const web3 = new Web3(provider);

// We create a function only to use async
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account ', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: '0' })
    .send({ gas: '2500000', from: accounts[0] });
  console.log('Contract deployed to ', result.options.address);
};
deploy();
