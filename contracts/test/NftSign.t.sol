// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "src/NftSign.sol";
import "forge-std/console2.sol";

contract NftSignTest is Test {
    NftSign signContract;
    address owner = makeAddr("owner");

    function setUp() public {
        // string[] memory args = new string(2);
        address signerAddress = 0x7368ea4b5A7204CFe592d096D4CdC8832f754027;
        string memory documentDescription = "Offer letter to the employee";
        string memory documentTitle = "Offer letter";
        string memory fileName = "Offer_letter.pdf";

        string
            memory documentContentHash = "bafybeidfdjh5jlw4snx3pnztauqzd5ivek6f2krb675tvrkulqzhfuuqlm";
        vm.prank(owner);
        signContract = new NftSign(
            fileName,
            documentTitle,
            documentDescription,
            signerAddress,
            documentContentHash
        );
    }

    function testSign() public {
        vm.prank(0x7368ea4b5A7204CFe592d096D4CdC8832f754027);
        string
            memory signContentHash = "bafkreigux7eowzyav3ejlrcxbzuosexydygmvtupvl3g5dqqnx5ckw5yq4";
        // console.log(signContract.getSign());

        signContract.sign(signContentHash);
        console.log(signContract.getDocument());
        console.log(signContract.getSign());

        assertEq(signContract.ownerOf(1), owner);
    }
}
