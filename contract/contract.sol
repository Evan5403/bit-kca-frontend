// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract BIT_KCA {
    // declaring vars
    uint256 number;
    string public message;

    // constructors
    constructor(uint256 y, string memory x){
        number = y;
        message = x;
    }

    // function
    function getNumber() external view returns(uint256){
        return number;
    }

    // writing functions
    // (1) increasing number by 1
    function increaseNum() external {
        number++;
    }

    // (2) decreasing number by 1
    function decreaseNum() external {
        number--;
    }

    // update message
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

}