pragma solidity ^0.5.8;

import "./ColaMixture.sol";

contract ColaPresentation is ColaMixture {
        function getCountByOwner(address _owner) public view returns(uint) {
                return ownerColaCount[_owner];
        }

        function getColaByOwner(address _owner, uint _number) public view returns(string memory, uint, uint8, uint32) {
                require(_number < ownerColaCount[_owner]);
                uint count = 0;
                for (uint i = 0; i < colas.length; ++i) 
                        if (colaToOwner[i] == _owner) {
                                if (count == _number) return (colas[i].name, colas[i].code, colas[i].level, colas[i].readyTime);
                                ++count;
                        }
        }
}
