pragma solidity ^0.5.8;

//import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract ColaFactory {
        using SafeMath for uint256;

        uint codeDigits = 16;
        uint codeModulus = 10 ** codeDigits;
        address owner = 0xD180b9c883F692dFB4E01Ad3b76d1C8ceF5f969F;

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

        function setCooldownTime(uint32 _cooldownTime) public {
            require(msg.sender == owner);
            cooldownTime = _cooldownTime;
        }

        function setOwner(address _newOwner) external {
            require(msg.sender == owner);
            owner = _newOwner;
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

        function produceRandomCola(string memory _name) public payable {
            require(ownerColaCount[msg.sender] < 2);
            require(msg.sender.balance >= 2*(10**18), "insufficient ETH");
            require(msg.value == 2*(10**18));
            address payable receiever = address(uint160(owner));
            receiever.transfer(msg.value);
            uint randCode = _generateRandomCode(_name);
            _produceCola(_name, randCode);
        }
}
