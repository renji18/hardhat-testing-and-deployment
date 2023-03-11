// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 public favNum;

    struct People {
        uint256 favNum;
        string name;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavNum;

    function retrieve() public view returns (uint256) {
        return favNum;
    }

    function store(uint256 _favNum) public {
        favNum = _favNum;
    }

    function addPerson(string memory _name, uint256 _favNum) public {
        people.push(People(_favNum, _name));
        nameToFavNum[_name] = _favNum;
    }
}