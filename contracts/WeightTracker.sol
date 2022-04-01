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
    mapping(address => Entry) private entries;

    constructor() ERC721("WeightTracker", "WGHT") {
        ownerAddress = msg.sender;
        contractAddress = address(this);
    }

    modifier onlyOwner() {
        require(msg.sender == ownerAddress, "This action is restricted to the owner of this contract");
        _;
    }

    modifier onlySetGoal(address _target) {
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

    function addMeasurement(uint8 _measurement) public onlySetGoal(msg.sender) {
        entries[msg.sender].measurements.push(_measurement);
    }

    function withdrawl() external returns (uint256) {
        uint8[] memory measurements = entries[msg.sender].measurements;
        require(measurements[measurements.length - 1] == entries[msg.sender].goal, "You have not reached your goal yet");

        payable(msg.sender).transfer(entries[msg.sender].reward);

        delete entries[msg.sender];

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, "https://ipfs.io/ipfs/QmcDamHSansZfsAKdmSbb3Puxw6GkNgSYAN8VgzcHbnWTZ?filename=nft.json");

        return newItemId;
    }

    function getGoalOfAddress(address _target) public view onlyOwner onlySetGoal(_target) returns (uint8) {
        return entries[_target].goal;
    }

    function getContractBalance() public view returns (uint) {
        return contractAddress.balance;
    }
}
