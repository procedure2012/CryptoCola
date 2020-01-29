pragma solidity ^0.5.8;

import "./ColaMixture.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ColaOwnership is ColaMixture, ERC721 {
        mapping (uint => address) colaApprovals;

        function balanceOf(address _owner) public view returns (uint256 _balance) {
                return ownerColaCount[_owner];
        }

        function ownerOf(uint256 _tokenId) public view returns (address _owner) {
                return colaToOwner[_tokenId];
        }

	/*function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable {
	}

	function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable {
	}*/

        function transferFrom(address _from, address _to, uint256 _tokenId) public {
                require((_from == address(this)) || (msg.sender == colaToOwner[_tokenId]));
                ownerColaCount[_to] = ownerColaCount[_to].add(1);
                ownerColaCount[_from] = ownerColaCount[_from].sub(1);
                colaToOwner[_tokenId] = _to;
                emit Transfer(_from, _to, _tokenId);
        }

        function approve(address _approved, uint256 _tokenId) public {
                require(msg.sender == colaToOwner[_tokenId]);
                colaApprovals[_tokenId] = _approved;
                emit Approval(msg.sender, _approved, _tokenId);
        }

	/*function setApprovalForAll(address _operator, bool _approved) external {
	}*/

        function getApproved(uint256 _tokenId) public view returns (address) {
                return colaApprovals[_tokenId];
        }

	/*function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
		return false;
	}*/

        function takeOwnership(uint256 _tokenId) public {
                require(msg.sender == colaApprovals[_tokenId]);
                transferFrom(ownerOf(_tokenId), msg.sender, _tokenId);
        }
}
