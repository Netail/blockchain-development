//SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

contract Final {

    address private owner;
    int8 private goal;
    int8[] private measurements;

    constructor(int8 _goal) {
        owner = msg.sender;
        goal = _goal;
    }

    modifier isOwner() {
        require(msg.sender == owner, "This action is restricted to the owner");
        _;
    }

    function addMeasurement(int8 measurement) public isOwner {
        measurements.push(measurement);
    }
}
