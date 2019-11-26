pragma solidity ^0.5.8;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "./ColaPresentation.sol";

contract ColaOwnership is ColaPresentation, ERC721Full {
        mapping (uint => address) colaApprovals;

        function balanceOf(address _owner) public view returns (uint256 _balance) {
                return ownerColaCount[_owner];
        }

        function ownerOf(uint256 _tokenId) public view returns (address _owner) {
                return colaToOwner[_tokenId];
        }

        function transferFrom(address _from, address _to, uint256 _tokenId) public {
                require(msg.sender == colaToOwner[_tokenId]);
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

        function getApproved(uint256 _tokenId) public view returns (address) {
                return colaApprovals[_tokenId];
        }

        function takeOwnership(uint256 _tokenId) public {
                require(msg.sender == colaApprovals[_tokenId]);
                transferFrom(ownerOf(_tokenId), msg.sender, _tokenId);
        }
}
