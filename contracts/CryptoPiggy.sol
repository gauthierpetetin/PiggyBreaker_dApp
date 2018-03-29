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

  uint public localContributionsCounter = 0;
  uint public lastUpdateDate = now;
  uint public lastContributionFrequency = 0;

  mapping (uint => Piggy) public piggies;                     // All piggies

  mapping (address => uint) public pendingReturnValues;       // Earnings of game vistories
  mapping (address => uint) public pendingReturnDates;        // Timestamps of game victories


  event PiggyCreated(uint _piggyID);
  event NewPiggyContribution(uint _piggyID, address _player, uint _value);
  event PiggyBroken(uint _piggyID, uint _value, address _winner, uint timestamp);
  event UpdateRate(uint _piggyID, uint _rateCurrent, uint rateNext);

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
    uint threeMinutes = 3 * 60;
    uint oneYear = 365 * 24 * 60 * 60;
    require( (now > piggy.lastContributionTime + threeMinutes) || (now > piggy.creationTime + oneYear) ); _;
  }

  modifier contributionIsHighEnough(uint contribution) {
    require( contribution >= rateCurrent ); _;
  }

  // Contstructor
  function Piggies(uint _nbPiggies) public {

    nbPiggies = _nbPiggies;
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
    piggy.value += msg.value;

    piggy.contributions.push(piggy.value);
    piggy.contributed[msg.sender] = true;
    piggy.contributors[piggy.value] = msg.sender;
    piggy.lastContributionTime = now;

    localContributionsCounter++;
    updateRate();

    emit NewPiggyContribution(nbPiggies, msg.sender, msg.value);
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
    uint winnerNumber = uint( keccak256(block.difficulty, now, piggy.contributions) ) % piggy.value;
    uint totalValue = piggy.value;

    if( piggy.contributions.length == 1) {                         // If only, one player, he can leave without playing the lottery
      piggy.winner = piggy.contributors[piggy.contributions[0]];
    }
    else {
      for (uint i = 0; i < piggy.contributions.length; i++) {     // If more than one player, play the lottery
        if( winnerNumber <= piggy.contributions[i] ) {
          piggy.winner = piggy.contributors[piggy.contributions[i]];
          uint newBabyPiggy = 3 * piggy.value / 100;
          totalValue -= newBabyPiggy;
          pendingReturnValues[farmer] += newBabyPiggy;            //A new piggy is offered to the farmer to replace the broken one
          break;
        }
      }
    }

    pendingReturnValues[piggy.winner] += totalValue;               //The winner receives the reward
    pendingReturnDates[piggy.winner] = now;
    piggy.open = false;

    emit PiggyBroken(nbPiggies, totalValue, piggy.winner, now);

    createNewPiggy();
  }

  function withdraw(address _withDrawalAddress) public {
    require(pendingReturnValues[msg.sender]>0);
    _withDrawalAddress.transfer(pendingReturnValues[msg.sender]);
    pendingReturnValues[msg.sender] = 0;
  }

  function setUpdatePeriod(uint _newUpdatePeriod) public restricted {
    require(_newUpdatePeriod > 60);
    updatePeriod = _newUpdatePeriod;
  }

  function setPercentage(uint _newPercentage) public restricted {
    percentage = _newPercentage;
  }

  function forgottenFundsRecovery(address _address) public restricted {
    uint oneYear = 365 * 24 * 60 * 60;
    require(now > pendingReturnDates[_address] + oneYear);
    msg.sender.transfer(pendingReturnValues[msg.sender]);
  }

}
