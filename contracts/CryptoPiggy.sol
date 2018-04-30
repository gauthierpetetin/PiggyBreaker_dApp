pragma solidity ^0.4.21;

contract Farm {

  address public farmer;

  function Farm() public {
    farmer = msg.sender;
  }

  modifier restricted() { require(msg.sender == farmer); _; }

  function transferFarmOwnership(address newFarmer) external restricted {
    if (newFarmer != address(0)) {
      farmer = newFarmer;
    }
  }

}

contract Pausable is Farm {

  bool public paused = false;

  address public newContractAddress;

  event Pause();
  event Unpause();
  event ContractUpgrade(address newContract);

  modifier whenNotPaused() { require(!paused); _; }

  modifier whenPaused { require(paused); _; }

  function pause() public restricted whenNotPaused returns (bool) {
    paused = true;
    emit Pause();
    return true;
  }

  function unpause() public restricted whenPaused returns (bool) {
    require(newContractAddress == address(0));
    paused = false;
    emit Unpause();
    return true;
  }

  function setNewAddress(address _v2Address) external restricted whenPaused {
      newContractAddress = _v2Address;
      emit ContractUpgrade(_v2Address);
  }

}

contract Piggies is Pausable {

  struct Piggy {
    uint piggyID;
    uint value;
    bool open;
    uint creationTime;
    uint lastContributionTime;
    uint brokenTime;
    uint brokenBlockNumber;
    uint[] contributions;
    address winner;
    mapping (address => bool) contributed;
    mapping (uint => address) contributors;
  }

  uint public nbPiggies = 0;
  uint public rateLimit = 10000000000000000;                  // E.g. 0.01 ether
  uint public rateCurrent = rateLimit;
  uint public rateNext = rateLimit;

  uint public updatePeriod = 15 * 60;                         // Every 15 minutes, the minimum contribution rate is updated
  uint public percentage = 100;                               // The growth percentage of the minimum contribution rate is 100%
                                                              // Example :
                                                              //   - If the contribution frequency increases, the minimum contribution rate will increase by 100% every 15 minutes
                                                              //   - If the contribution frequency decreases, the minimum contribution rate will decrease by 50% every 15 minutes

  uint public piggyProtectionTime = 3 * 60;                   // The Piggy is protected after each new contribution during piggyProtectionTime
  uint public piggyProtectionLimit = 90 * 24 * 60 * 60;       // After the piggyProtectionLimit, the Piggy isn't protected anymore

  uint public localContributionsCounter = 0;
  uint public lastUpdateDate = now;
  uint public lastContributionFrequency = 0;

  mapping (uint => Piggy) public piggies;                     // All piggies
  mapping (address => uint) public pendingReturnValues;       // Earnings of game vistories
  mapping (address => uint) public pendingReturnDates;        // Timestamps of game victories


  event PiggyCreated(uint _piggyID);
  event NewPiggyContribution(uint _piggyID, address _player, uint _value, uint _nbContribution);
  event UpdateRate(uint _piggyID, uint _rateCurrent, uint _rateNext);
  event PiggyBroken(uint _piggyID, uint _value, uint timestamp, uint _nbContribution);
  event WinnerRevealed(uint _piggyID, address _winner, uint _value);
  event Withdrawal(address _player, uint _value);

  modifier contributed(address _player) {
    Piggy storage piggy = piggies[nbPiggies];
    bool playerContributed = false;
    if( piggy.contributed[_player] ) {
      playerContributed = true;
    }
    require( playerContributed ); _;
  }

  modifier noPlayerJoinedRecently() {
    Piggy storage piggy = piggies[nbPiggies];
    require( (now > piggy.lastContributionTime + piggyProtectionTime) || (now > piggy.creationTime + piggyProtectionLimit) ); _;
  }

  modifier contributionIsHighEnough(uint _contribution) {
    require( _contribution >= rateCurrent ); _;
  }

  modifier piggyWinnerIsUnknown(uint _piggyID) {
    Piggy storage piggy = piggies[_piggyID];
    require( (!piggy.open) && (piggy.winner==address(0)) ); _;
  }

  modifier blockNumberIsValid(uint _currentBlockNumber) {
    Piggy storage piggy = piggies[nbPiggies];
    require( piggy.brokenBlockNumber < _currentBlockNumber ); _;
  }


  // Contstructor
  function Piggies() public {
    createNewPiggy();
  }

  function createNewPiggy() private {
    require(!piggies[nbPiggies].open);

    uint _piggyID = ++nbPiggies;
    uint[] memory _contributions;
    address _winner;

    piggies[_piggyID] = Piggy({
      piggyID: _piggyID,
      value: 0,
      open: true,
      creationTime: now,
      lastContributionTime: now,
      brokenTime: 0,
      brokenBlockNumber: 0,
      contributions: _contributions,
      winner: _winner
    });

    emit PiggyCreated(_piggyID);
  }

  function contribute() public payable
    contributionIsHighEnough(msg.value)
  {
    Piggy storage piggy = piggies[nbPiggies];
    require(piggy.open);

    // If this is the first contribution, the previous winner needs to be revealed
    if(nbPiggies > 1 && (piggy.value == 0) ) {
      revealPreviousWinner(nbPiggies - 1);
    }

    piggy.value += msg.value;

    piggy.contributions.push(piggy.value);
    piggy.contributed[msg.sender] = true;
    piggy.contributors[piggy.value] = msg.sender;
    piggy.lastContributionTime = now;

    localContributionsCounter++;
    updateRate();

    emit NewPiggyContribution(nbPiggies, msg.sender, msg.value, getNbContributions(nbPiggies));
  }

  function updateRate() private {
    uint timeSinceLastUpdate = now - lastUpdateDate;
    if ( timeSinceLastUpdate > updatePeriod) {
      if (rateNext >= rateLimit) {
        rateCurrent = rateNext;
      }
      else {
        rateCurrent = rateLimit;
        rateNext = rateLimit;
      }

      uint decimals = 1000000000;
      uint currentContributionFrequency = decimals * localContributionsCounter / timeSinceLastUpdate;
      if(currentContributionFrequency >= lastContributionFrequency) {
        rateNext = rateCurrent * ( 100 + percentage ) / 100;
      }
      else {
        rateNext = rateCurrent * 100 / ( 100 + percentage );
      }

      localContributionsCounter = 0;
      lastUpdateDate = now;
      lastContributionFrequency = currentContributionFrequency;
      emit UpdateRate(nbPiggies, rateCurrent, rateNext);

    }
  }


  function breakPiggy() public
    noPlayerJoinedRecently
    contributed(msg.sender)
  {
    Piggy storage piggy = piggies[nbPiggies];
    piggy.brokenTime = now;
    piggy.brokenBlockNumber = block.number;
    piggy.open = false;

    emit PiggyBroken(nbPiggies, piggy.value, now, getNbContributions(nbPiggies));

    createNewPiggy();
  }

  function revealPreviousWinner(uint _piggyID) private
    piggyWinnerIsUnknown(_piggyID)
    blockNumberIsValid(block.number)
  {
    Piggy storage piggy = piggies[_piggyID];
    uint winnerNumber = uint( keccak256(block.blockhash(piggy.brokenBlockNumber+1)) ) % piggy.value;
    uint totalValue = piggy.value;

    if( piggy.contributions.length == 1) {                         // If only, one player, he can leave without playing the lottery
      piggy.winner = piggy.contributors[piggy.contributions[0]];
    }
    else {
      for (uint i = 0; i < piggy.contributions.length; i++) {     // If more than one player, play the lottery
        if( winnerNumber <= piggy.contributions[i] ) {
          piggy.winner = piggy.contributors[piggy.contributions[i]];
          uint piggyReparationFee = 375 * piggy.value / 10000;
          totalValue -= piggyReparationFee;
          pendingReturnValues[farmer] += piggyReparationFee;            //A new piggy is offered to the farmer to replace the broken one
          break;
        }
      }
    }

    pendingReturnValues[piggy.winner] += totalValue;               //The winner receives the reward
    pendingReturnDates[piggy.winner] = now;

    emit WinnerRevealed(_piggyID, piggy.winner, piggy.value);
  }

  function withdraw(address _withDrawalAddress) public {
    require(pendingReturnValues[msg.sender]>0);
    uint withdrawalValue = pendingReturnValues[msg.sender];
    pendingReturnValues[msg.sender] = 0;
    _withDrawalAddress.transfer(withdrawalValue);

    Withdrawal(msg.sender, withdrawalValue);
  }

  function setRateLimit(uint _newRateLimit) public restricted {
    rateLimit = _newRateLimit;
  }

  function setUpdatePeriod(uint _newUpdatePeriod) public restricted {
    require(_newUpdatePeriod > 60);
    updatePeriod = _newUpdatePeriod;
  }

  function setPercentage(uint _newPercentage) public restricted {
    percentage = _newPercentage;
  }

  function setPiggyProtectionTime(uint _piggyProtectionTime) public restricted {
    piggyProtectionTime = _piggyProtectionTime;
  }

  function setPiggyProtectionLimit(uint _piggyProtectionLimit) public restricted {
    piggyProtectionLimit = _piggyProtectionLimit;
  }

  function getContributionAmount(uint _piggyID, address _player) public view returns(uint) {
    Piggy storage piggy = piggies[_piggyID];
    uint contributionAmount = 0;
    for(uint i = 0; i < piggy.contributions.length; i++) {
      if( piggy.contributors[piggy.contributions[i]] == _player ) {
        if(i==0) {
          contributionAmount += piggy.contributions[i];
        }
        else {
          contributionAmount += ( piggy.contributions[i] - piggy.contributions[i-1] );
        }
      }
    }
    return contributionAmount;
  }

  function getNbContributions(uint _piggyID) public view returns(uint) {
    Piggy storage piggy = piggies[_piggyID];
    return piggy.contributions.length;
  }

  function forgottenFundsRecovery(address _playerAddress, address _withDrawalAddress) public restricted {
    uint oneYear = 365 * 24 * 60 * 60;
    require(now > pendingReturnDates[_playerAddress] + oneYear);
    uint withdrawalValue = pendingReturnValues[_playerAddress];
    pendingReturnValues[_playerAddress] = 0;
    _withDrawalAddress.transfer(withdrawalValue);
  }

}
