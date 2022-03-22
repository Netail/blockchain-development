// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

contract IceCream {
    address smartContract;
    address payable private factory;
    address payable private client;
    address payable private transport;
    address private sensor;

    int8[] private temperatures;

    struct order {
        uint256 priceIce;
        uint256 priceTransport;
    }

    constructor(address payable _client, address payable _transport, address _sensor) {
        smartContract = address(this);
        factory == payable(msg.sender);
        client = _client;
        transport = _transport;
        sensor = _sensor;
    }

    function getBalance() public view returns (uint256) {
        return smartContract.balance;
    }

    function addTemp(int8 _temp) public {
        require(msg.sender != sensor, "Only the sensor is allowed to add temperatures");

        temperatures.push(_temp);
    }
}
