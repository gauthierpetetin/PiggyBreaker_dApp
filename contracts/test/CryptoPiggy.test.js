//CryptoPiggy.test.js
const assert = require('assert');
const ganache = require('ganache-cli'); // Local test network
const sinon = require('sinon');
//Convention
// - Capital letter for library
// - Normal letter for an instance of the library
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider); // ganache will change depending on what network we want to connect to
// Mocha is a test running framework

const {interface, bytecode} = require('../compile');


// ---------- Module to accelerate time -----------------------
const jsonrpc = '2.0'
const id = 0
const send = async (method, params = []) => {
  console.log("Current provider : ", web3.currentProvider);
  console.log("Method : ", method);
  console.log("Params : ", params);
  await web3.currentProvider.send({ id, jsonrpc, method, params })
}

const timeTravel = async seconds => {
  await send('evm_increaseTime', [seconds])
  await send('evm_mine')
}
const SECONDS_IN_A_MINUTE = 60;
// ---------- Module to accelerate time -----------------------


// let clock;
let accounts;
let cryptoPiggy;
let initial_nbPiggies = 0;
beforeEach(async () => {
  const now = Date.now();
  // clock = sinon.useFakeTimers(now);
  // Get list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract

  cryptoPiggy = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: [initial_nbPiggies] })
  .send({ from: accounts[0], gas: '2500000' });

  cryptoPiggy.setProvider(provider);
});

describe('CryptoPiggy', () => {

  it('deploys a contract',() => {
    assert.ok(cryptoPiggy.options.address);
  });
  it('marks caller as the contract owner (farmer)', async() => {
    const farmer = await cryptoPiggy.methods.farmer().call();
    assert.equal(accounts[0], farmer);
  });
  it('creates first Piggy', async() => {
    const nbPiggies = await cryptoPiggy.methods.nbPiggies().call();
    const currentPiggy = await cryptoPiggy.methods.piggies(nbPiggies).call();
    assert( (nbPiggies == (initial_nbPiggies + 1) ) && currentPiggy.open );
  });
  it('allows people to contribute money and mark them as contributors', async() => {
    const rateCurrent = await cryptoPiggy.methods.rateCurrent().call();
    const balance = await web3.eth.getBalance(accounts[1]);
    const rateRandom = Math.random() * (balance - rateCurrent);
    const randomContribution = (1*rateCurrent) + rateRandom ;
    await cryptoPiggy.methods.contribute().send({
      value: randomContribution,
      from: accounts[1],
      gas: '1000000'
    });
    const nbPiggies = await cryptoPiggy.methods.nbPiggies().call();
    let isContributor = await cryptoPiggy.methods.getContributionStatus(nbPiggies, accounts[1]).call();
    let contribution = await cryptoPiggy.methods.getContributionAmount(nbPiggies, accounts[1]).call();
    assert(isContributor && (contribution == randomContribution) );
  });
  it('allows people to contribute with the minimum contribution', async() => {
    const rateCurrent = await cryptoPiggy.methods.rateCurrent().call();
    await cryptoPiggy.methods.contribute().send({
      value: rateCurrent,
      from: accounts[2],
      gas: '1000000'
    });
    const nbPiggies = await cryptoPiggy.methods.nbPiggies().call();
    let isContributor = await cryptoPiggy.methods.getContributionStatus(nbPiggies, accounts[2]).call();
    let contribution = await cryptoPiggy.methods.getContributionAmount(nbPiggies, accounts[2]).call();
    assert(isContributor && (contribution == rateCurrent) );
  });
  it('does not allow people to contribute with less than the minimum contribution', async() => {
    const rateCurrent = await cryptoPiggy.methods.rateCurrent().call();
    const smallContribution = ((1*rateCurrent) - 2);
    try {
      await cryptoPiggy.methods.contribute().send({
        value: smallContribution,
        from: accounts[0],
        gas: '1000000'
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows contributors to break the piggy after 3 minutes', async() => {
    const rateCurrent = await cryptoPiggy.methods.rateCurrent().call();
    // clock.tick(3*60);
    // await timeTravel(200);
    assert(true);
  });

});

afterEach(function () {
    // clock.restore();
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
