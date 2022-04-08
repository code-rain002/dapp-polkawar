// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ReentrancyGuard.sol";

contract PolkaWarFaucet is Ownable, ReentrancyGuard {

    IERC20 public PWAR;
    uint256 public claimAmount;
    address[] private users;

    constructor(address _tokenAddress, uint256 _claimAmount) {
        PWAR = IERC20(_tokenAddress);
        claimAmount = _claimAmount * 1e18;
    }

    event Claim(address indexed user, uint256 amount);

    function alreadyClaimed(address _user) internal view returns (bool) {
        for(uint256 i=0;i<users.length; i++)
            if(users[i] == _user)
                return true;
        return false;
    }

    function claimTokens() external nonReentrant {
        uint256 balance = PWAR.balanceOf(address(this));
        require(balance > claimAmount, "insufficient token balance");
        require(!alreadyClaimed(msg.sender), "you already claimed");
        PWAR.transfer(msg.sender, claimAmount);
        users.push(msg.sender);

        emit Claim(msg.sender, claimAmount);
    }
 
    // withdraw funds
   function withdraw() external onlyOwner {
    uint256 balance = PWAR.balanceOf(address(this));
    require(balance > 0, "zero token amount");
    PWAR.transfer(msg.sender, balance);
}    
}