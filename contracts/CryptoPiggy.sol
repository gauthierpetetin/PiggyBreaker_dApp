pragma solidity ^0.4.17;

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
    Pause();
    return true;
  }

  function unpause() public restricted whenPaused returns (bool) {
    require(newContractAddress == address(0));
    paused = false;
    Unpause();
    return true;
  }

  function setNewAddress(address _v2Address) external restricted whenPaused {
      newContractAddress = _v2Address;
      ContractUpgrade(_v2Address);
  }

}

contract Piggies is Pausable {

  uint public nbPiggies = 0;
  uint public minContribution = 10000000000000000;

  mapping (uint => Piggy) public piggies;           // All piggies

  mapping (address => uint) public pendingReturnValues;       // Earnings of game vistories
  mapping (address => uint) public pendingReturnTimestamps;   // Timestamps of game victories

  struct Piggy {
    uint piggyID;
    uint value;
    bool open;
    uint creationTime;
    uint lastContributionTime;
    uint[] contributions;
    address[] contributors;
    address winner;
  }

  event PiggyCreated(uint _piggyID);
  event NewPiggyContribution(uint _piggyID, address _player, uint _value);
  event PiggyBroken(uint _piggyID, uint _value, address[] contributors, address _winner, uint timestamp);


  function Piggies(uint _nbPiggies) public {
    // Contstructor
    nbPiggies = _nbPiggies;
    createNewPiggy();
  }

  function createNewPiggy() private {
    require(!piggies[nbPiggies].open);

    uint _piggyID = ++nbPiggies;
    uint[] memory _contributions;
    address[] memory _contributors;
    address _winner;

    piggies[_piggyID] = Piggy({
      piggyID: _piggyID,
      value: 0,
      open: true,
      creationTime: now,
      lastContributionTime: now,
      contributions: _contributions,
      contributors: _contributors,
      winner: _winner
    });

    PiggyCreated(_piggyID);
  }

  function contribute() public payable {
    require(msg.value > minContribution);
    Piggy storage piggy = piggies[nbPiggies];
    piggy.value += msg.value;
    piggy.lastContributionTime = now;
    piggy.contributions.push(piggy.value);
    piggy.contributors.push(msg.sender);

    NewPiggyContribution(nbPiggies, msg.sender, msg.value);
  }

  function breakPiggy() public
    noPlayerJoinedRecently
    contributed(msg.sender)
  {
    Piggy storage piggy = piggies[nbPiggies];
    uint winnerNumber = uint( keccak256(block.difficulty, now, piggy.contributions) ) % piggy.value;
    uint totalValue = piggy.value;

    if( piggy.contributors.length == 1) {                         // If only, one player, he can leave without playing the lottery
      piggy.winner = piggy.contributors[0];
    }
    else {
      for (uint i = 0; i < piggy.contributions.length; i++) {     // If more than one player, play the lottery
        if( winnerNumber <= piggy.contributions[i] ) {
          piggy.winner = piggy.contributors[i];
          uint newBabyPiggy = 3 * piggy.value / 100;
          totalValue -= newBabyPiggy;
          pendingReturnValues[farmer] += newBabyPiggy;            //A new piggy is offered to the farmer to replace the broken one
          break;
        }
      }
    }

    pendingReturnValues[piggy.winner] += totalValue;               //The winner receives the reward
    pendingReturnTimestamps[piggy.winner] = now;
    piggy.open = false;

    PiggyBroken(nbPiggies, totalValue, piggy.contributors, piggy.winner, now);

    createNewPiggy();
  }

  function withdraw(address _withDrawalAddress) public {
    require(pendingReturnValues[msg.sender]>0);
    _withDrawalAddress.transfer(pendingReturnValues[msg.sender]);
    pendingReturnValues[msg.sender] = 0;
  }

  modifier contributed(address _player) {
    Piggy storage piggy = piggies[nbPiggies];
    bool playerContributed = false;
    for (uint i = 0; i < piggy.contributors.length; i++) {
      if( piggy.contributors[i]==_player ) {
        playerContributed = true;
      }
    }
    require( playerContributed ); _;
  }

  modifier noPlayerJoinedRecently() {
    Piggy storage piggy = piggies[nbPiggies];
    uint threeMinutes = 3 * 60;
    uint oneYear = 365 * 24 * 60 * 60;
    require( (now > piggy.lastContributionTime + threeMinutes) || (now > piggy.creationTime + oneYear) ); _;
  }

  function forgottenFundsRecovery(address _address) public restricted {
    uint oneYear = 365 * 24 * 60 * 60;
    require(now > pendingReturnTimestamps[_address] + oneYear);
    msg.sender.transfer(pendingReturnValues[msg.sender]);
  }

}
