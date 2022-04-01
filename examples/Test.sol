// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5;

contract Test {
    uint number;
    address ownerAddress;
    address contractAddress;
    mapping(address => uint) public guesses;

    constructor(uint8 num) {
        number = num;
        ownerAddress = msg.sender;
        contractAddress = address(this);
    }

    function yourGuess(uint8 guess) public payable returns (string memory) {
        require(guesses[msg.sender] != 0, "You've already submitted an answer...");

        (bool success, ) = payable(contractAddress).call{value: msg.value}("");
        require(success, "Failed to complete payment");

        if (guess == number) {
            return "CORRECT!";
        } else {
            return "INCORRECT!";
        }
    }

    function getBalance() public view returns (uint accountBalance) {
        return contractAddress.balance;
    }
}

