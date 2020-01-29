pragma solidity ^0.5.8;

import "./ColaFactory.sol";

contract ColaMixture is ColaFactory {
        modifier onlyOwnerOf(uint _colaId) {
                require(msg.sender == colaToOwner[_colaId]);
                _;
        }

        function _triggerCooldown(Cola storage _cola) internal {
                _cola.readyTime = uint32(now + cooldownTime);
        }

        function _isReady(Cola storage _cola) view internal returns(bool) {
                return (_cola.readyTime <= now);
        }

        function mixCola(string memory _name, uint _colaId1, uint _colaId2) public {
                require(msg.sender == colaToOwner[_colaId1] && msg.sender == colaToOwner[_colaId2]);
                Cola storage cola1 = colas[_colaId1];
                Cola storage cola2 = colas[_colaId2];
                if (_isReady(cola1) && _isReady(cola2)) {
                    uint newColaCode = (colas[_colaId1].code + colas[_colaId2].code) / 2; 
                    _produceCola(_name, newColaCode);
                    _triggerCooldown(cola1);
                    _triggerCooldown(cola2);
                }
        }
}
