// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20("TestDecentrad", "tDRT") {
    function mint(address recipient, uint256 amount) external {
        _mint(recipient, amount);
    }
}