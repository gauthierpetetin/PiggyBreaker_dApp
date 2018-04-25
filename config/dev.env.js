'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://127.0.0.1:8085/api/invite/email"',
  ETHEREUM_NODE_ENV: '"development"',
  ETHEREUM_NODE_URL: '"wss://ropsten.eth.6120.eu/ws"',
  ETHEREUM_CONTRACT: '"0x70f2499ad14107eb37536ef4d079a2252ba732a3"',
  ETHEREUM_ABI: '`[{"constant":false,"inputs":[],"name":"breakPiggy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnValues","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateNext","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"localContributionsCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"piggyProtectionLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newFarmer","type":"address"}],"name":"transferFarmOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastContributionFrequency","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnDates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"piggyProtectionTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_withDrawalAddress","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPercentage","type":"uint256"}],"name":"setPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_piggyProtectionLimit","type":"uint256"}],"name":"setPiggyProtectionLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rateLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nbPiggies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updatePeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"piggies","outputs":[{"name":"piggyID","type":"uint256"},{"name":"value","type":"uint256"},{"name":"open","type":"bool"},{"name":"creationTime","type":"uint256"},{"name":"lastContributionTime","type":"uint256"},{"name":"brokenTime","type":"uint256"},{"name":"winner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"forgottenFundsRecovery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newRateLimit","type":"uint256"}],"name":"setRateLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_piggyProtectionTime","type":"uint256"}],"name":"setPiggyProtectionTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newUpdatePeriod","type":"uint256"}],"name":"setUpdatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_nbPiggies","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"}],"name":"PiggyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewPiggyContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_winner","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PiggyBroken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_rateCurrent","type":"uint256"},{"indexed":false,"name":"rateNext","type":"uint256"}],"name":"UpdateRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]`'
})
