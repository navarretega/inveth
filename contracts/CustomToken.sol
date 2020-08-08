pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract CustomToken is ERC20, ERC20Detailed {
    constructor(uint256 initialSupply) public ERC20Detailed("Oxuha", "OXH", 0) {
        _mint(msg.sender, initialSupply);
    }
}
