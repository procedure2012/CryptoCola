pragma solidity ^0.5.8;

import "./ColaMixture.sol";

contract ColaPresentation is ColaMixture {
        function getCountByOwner(address _owner) public view returns(uint) {
                return ownerColaCount[_owner];
        }

        function getColaByOwner(address _owner, uint _number) public view returns(string memory, uint, uint8, uint32, uint) {
                require(_number < ownerColaCount[_owner]);
                uint count = 0;
                for (uint i = 0; i < colas.length; ++i) 
                        if (colaToOwner[i] == _owner) {
                                if (count == _number) return (colas[i].name, colas[i].code, colas[i].level, colas[i].readyTime, colas[i].price);
                                ++count;
                        }
        }
        
        function getColaMarket() public view returns(string memory, uint, uint8, uint32, uint) {
                for (uint i = 0; i < colas.length; ++i) 
                        if (colas[i].price > 0) 
                                return (colas[i].name, colas[i].code, colas[i].level, colas[i].readyTime, colas[i].price);
        }

        function sellCola(uint _colaId, uint _price) external {
                require(msg.sender == colaToOwner[_colaId]);
                colas[_colaId].price = _price;
        }

        function buyCola(uint _colaId) external payable {
                require(msg.value >= colas[_colaId].price);
                address payable seller = address(uint160(colaToOwner[_colaId]));
                seller.transfer(msg.value);
        }
}
