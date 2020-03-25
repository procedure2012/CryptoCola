pragma solidity ^0.5.8;

import "./ColaOwnership.sol";

contract ColaPresentation is ColaOwnership {
	struct Auction {
		address seller;
		uint price;
		bool isOn;
	}

	mapping (uint => Auction) public colaToAuction;

	function isOnAuction(Auction storage _auction) internal view returns(bool) {
		return _auction.isOn;
	}

	function removeAuction(uint _colaId) internal {
		delete colaToAuction[_colaId];
	}

	function getCountByOwner(address _owner) public view returns(uint) {
		uint count = 0;
		for (uint i = 0; i < colas.length; ++i) 
			if ((colaToOwner[i] == _owner) || ((isOnAuction(colaToAuction[i])) && (colaToAuction[i].seller == _owner)))
				count++;
		return count;
	}

    function getColaByOwner(address _owner) public view returns(uint[] memory) {
		uint count = 0;
        for (uint i = 0; i < colas.length; ++i) 
            if ((colaToOwner[i] == _owner) || (isOnAuction(colaToAuction[i]) && (colaToAuction[i].seller == _owner))) 
				count++;
		uint[] memory result = new uint[](count);
		count = 0;
		for (uint i = 0; i < colas.length; ++i) 
            if ((colaToOwner[i] == _owner) || (isOnAuction(colaToAuction[i]) && (colaToAuction[i].seller == _owner))) {
				result[count] = i;
				count++;
            }
		return result;
    }
        
    function getColaMarket() public view returns(uint[] memory) {
		uint count = 0;
        for (uint i = 0; i < colas.length; ++i) 
            if (isOnAuction(colaToAuction[i])) count++;
		uint[] memory result = new uint[](count);
		count = 0;
		for (uint i = 0; i < colas.length; ++i)
			if (isOnAuction(colaToAuction[i])){
				result[count] = i;
				count++;
			}
		return result;
    }

    function sellCola(uint _colaId, uint _price) external {
        require(msg.sender == colaToOwner[_colaId], "You don not own this cola!");
		colaToAuction[_colaId] = Auction(msg.sender, _price*10**18, true);
		transferFrom(msg.sender, address(this), _colaId);
    }

	function cancelSellCola(uint _colaId) external {
		require(isOnAuction(colaToAuction[_colaId]), "This cola is not for sale!");
		require(msg.sender == colaToAuction[_colaId].seller, "You don not own this cola!");
		transferFrom(address(this), msg.sender, _colaId);
		removeAuction(_colaId);
	}

    function buyCola(uint _colaId) external payable {
		require(isOnAuction(colaToAuction[_colaId]), "This cola is not for sale!");
		require(msg.value == colaToAuction[_colaId].price, "The price is wrong!");
		require(msg.value <= msg.sender.balance, "You don't have enough money!");
        address payable seller = address(uint160(colaToAuction[_colaId].seller));
        seller.transfer(msg.value);
		transferFrom(address(this), msg.sender, _colaId);
		removeAuction(_colaId);
    }
}
