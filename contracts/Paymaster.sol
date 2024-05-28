/// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IPaymaster, PAYMASTER_VALIDATION_SUCCESS_MAGIC} from "./IPaymaster.sol";
import "./Transaction.sol";

address constant BOOT_LOADER = address(0x8001);

contract Paymaster is IPaymaster {
    uint public c;

    function validateAndPayForPaymasterTransaction(
        bytes32 /* _txHash */,
        bytes32 /*_suggestedSignedHash*/,
        Transaction calldata _transaction
    ) external payable override returns (bytes4 magic, bytes memory context) {
        require(BOOT_LOADER == msg.sender);
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;
        context = "";

        uint paybackValue = _transaction.maxFeePerGas * _transaction.gasLimit;

        (bool success, ) = BOOT_LOADER.call{value: paybackValue}("");
        require(success);
    }

    receive() external payable {}
}
