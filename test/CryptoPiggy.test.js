//CryptoPiggy.test.js
const assert = require('assert');
const ganache = require('ganache-cli'); // Local test network
//Convention
// - Capital letter for library
// - Normal letter for an instance of the library
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider); // ganache will change depending on what network we want to connect to
// Mocha is a test running framework

const {interface, bytecode} = require('../compile');


let accounts;
let cryptoPiggy;
beforeEach(async () => {
  // Get list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  cryptoPiggy = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: '0' })
  .send({ from: accounts[0], gas: '2500000' });

  cryptoPiggy.setProvider(provider);
});

describe('CryptoPiggy', () => {
  it('deploys a contract',() => {
    assert.ok(cryptoPiggy.options.address);
  });
  // it('has a default message', async () => {
  //   const message = await cryptoPiggy.methods.message().call();
  //   assert.equal(message, 'Hi there!');
  // });
  // it('can change message', async () => {
  //   await cryptoPiggy.methods.setMessage('bye').send({ from: accounts[0]
  //   // Example of payable method
  //   // await cryptoPiggy.methods.setMessage('bye').send({ from: accounts[0], value: web3.utils.toWei('0.01', 'ether') });
  //   const message = await cryptoPiggy.methods.message().call();
  //   assert.equal(message, 'bye');
  // });
});


/*********************Try catch demo*******************************************/
// it('minimum amount of ether', async () => {
//   try {
//     await cryptoPiggy.methods.setMessage('bye').send({ from: accounts[0], value: web3.utils.toWei('0', 'ether') });
//     assert(false);  // Should never be reached
//   } catch (err) {
//     assert(err);    // There should be an error
//   }
//   assert.equal(message, 'bye');
// });
/*********************Try catch demo end***************************************/

/*********************Mocha demo***********************************************/
// class Car {
//   park() { return 'stopped'; }
//   drive() { return 'vroom'; }
// }
//
// //Variable declaration
// // - let : variable can be reassigned
// // - const : variable can not be reassigned
// let car;
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car blabla', () => {
//   it('can park',() => {
//     assert.equal(car.park(), 'stopped');
//   });
//   it('can drive',() => {
//     assert.equal(car.drive(), 'vroom');
//   });
// });
/*********************Mocha demo end*******************************************/
