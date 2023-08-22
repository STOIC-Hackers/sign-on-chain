// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "src/NftSign.sol";
import "forge-std/console2.sol";

contract NftSignTest is Test {
    NftSign signContract;

    function setUp() public {
        // string[] memory args = new string(2);
        address signerAddress = 0x7368ea4b5A7204CFe592d096D4CdC8832f754027;
        string
            memory documentContentHash = "bafybeidfdjh5jlw4snx3pnztauqzd5ivek6f2krb675tvrkulqzhfuuqlm";
        signContract = new NftSign(signerAddress, documentContentHash);
    }

    function testSign() public {
        vm.prank(0x7368ea4b5A7204CFe592d096D4CdC8832f754027);
        string
            memory signContentHash = "bafkreigux7eowzyav3ejlrcxbzuosexydygmvtupvl3g5dqqnx5ckw5yq4";
        // console.log(signContract.getSign());

        signContract.sign(signContentHash);
        console.log(signContract.getDocument());
        console.log(signContract.getSign());
    }
}
