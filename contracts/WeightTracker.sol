//SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WeightTracker is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Entry {
        uint8 goal;
        uint256 reward;
        uint8[] measurements;
    }

    address private ownerAddress;
    address private contractAddress;
    string private rewardURI;
    mapping(address => Entry) private entries;

    constructor(string memory _rewardURI) ERC721("WeightTracker", "WGHT") {
        ownerAddress = msg.sender;
        contractAddress = address(this);
        rewardURI = _rewardURI;
    }

    modifier onlyOwner() {
        require(msg.sender == ownerAddress, "This action is restricted to the owner of this contract");
        _;
    }

    modifier onlyHasGoal(address _target) {
        require(entries[_target].goal != 0, "No goal for this address has been set yet");
        _;
    }

    function setGoal(uint8 _goal) external payable {
        require(entries[msg.sender].goal == 0, "Finish your first goal before starting a new one");

        entries[msg.sender] = Entry({
            goal: _goal,
            reward: msg.value,
            measurements: new uint8[](0)
        });
    }

    function addMeasurement(uint8 _measurement) public onlyHasGoal(msg.sender) {
        entries[msg.sender].measurements.push(_measurement);
    }

    function withdraw() external returns (uint256) {
        uint8[] memory measurements = entries[msg.sender].measurements;
        require(measurements[measurements.length - 1] <= entries[msg.sender].goal, "You have not reached your goal yet");

        payable(msg.sender).transfer(entries[msg.sender].reward);

        delete entries[msg.sender];

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, rewardURI);

        return newItemId;
    }

    function getGoal() public view onlyHasGoal(msg.sender) returns (uint8) {
        return entries[msg.sender].goal;
    }

    function getMeasurements() public view onlyHasGoal(msg.sender) returns (uint8[] memory) {
        return entries[msg.sender].measurements;
    }

    function getContractBalance() public view returns (uint) {
        return contractAddress.balance;
    }
}
