pragma solidity ^0.5.8;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ColaFactory is Ownable {
        using SafeMath for uint256;

        uint codeDigits= 16;
        uint codeModulus = 10 ** codeDigits;

        event NewCola(uint colaId, string name, uint code);

        struct Cola {
                string name;
                uint code;
                uint8 level;
                uint32 readyTime;
        }

        Cola[] public colas; 

        mapping (uint => address) public colaToOwner;
        mapping (address => uint) public ownerColaCount;

        uint32 cooldownTime = 1 minutes;//need to consider

        function setCooldownTime(uint32 _cooldownTime) public /*onlyOwner*/ {
                cooldownTime = _cooldownTime;
        }

        function getCooldownTime() public view returns(uint32) {
                return cooldownTime;
        }

        function _produceCola(string memory _name, uint _code) internal {
                uint id = colas.push(Cola(_name, _code, 0, uint32(now + cooldownTime))) - 1;
                colaToOwner[id] = msg.sender;
                ownerColaCount[msg.sender]++;
                emit NewCola(id, _name, _code);
        }

        function _generateRandomCode(string memory _str) private view returns (uint) {
                uint rand = uint(keccak256(abi.encodePacked(_str)));
                return rand % codeModulus;
        }

        function produceRandomCola(string memory _name) public {
                require(ownerColaCount[msg.sender] < 2);
                uint randCode = _generateRandomCode(_name);
                _produceCola(_name, randCode);
        }
}
