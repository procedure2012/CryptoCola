pragma solidity ^0.5.8;

import "./ColaMixture.sol";

contract ColaPresentation is ColaMixture {
        function getCountByOwner(address _owner) public view returns(uint) {
                return ownerColaCount[_owner];
        }

        function getColaByOwner(address _owner) public view returns(uint[] memory) {
		uint[] memory result = new uint[](ownerColaCount[_owner]);
		uint count = 0;
                for (uint i = 0; i < colas.length; ++i) 
                        if (colaToOwner[i] == _owner) {
				result[count] = i;
				count++;
                        }
		return result;
        }
        
        function getColaMarket(uint _number) public view returns(string memory, uint, uint8, uint32, uint) {
		uint count = 0;
                for (uint i = 0; i < colas.length; ++i) 
                        if (colas[i].price > 0) 
				if (count == _number)
                                	return (colas[i].name, colas[i].code, colas[i].level, colas[i].readyTime, colas[i].price);
		return ('', 0, 0, 0, 0);
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
