// NftSign.sol
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftSign is ERC721URIStorage, Ownable {
    string public documentContentHash;
    address public intendedSigner;
    uint tokenId;
    bool public signed = false;

    constructor(address _intendedSigner, string memory _documentContentHash)
        ERC721("NftSign", "NS")
    {
        // _mint(signerAddress, 0); // Mint the NFT to the signer
        // _setTokenURI(0, ipfsContentHash); // Set the NFT's metadata URL (IPFS content hash)
        // transferOwnership(creator); // Transfer ownership to the creator (SignFactory)
        documentContentHash = _documentContentHash;
        intendedSigner = _intendedSigner;
    }

    modifier onlyIntendedSigner() {
        require(
            intendedSigner == msg.sender,
            "Only intended signer can call this"
        );
        _;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function sign(string memory _signatureContentHash)
        external
        onlyIntendedSigner
    {
        require(signed == false, "Document already signed");
        tokenId += 1;
        signed = true;
        _mint(owner(), tokenId); // Mint a new NFT for the signer
        _setTokenURI(tokenId, _signatureContentHash); // Set the NFT's metadata URL (IPFS content hash)
    }

    function getDocument() external view returns (string memory) {
        string memory base = _baseURI();

        return string(abi.encodePacked(base, documentContentHash));
    }

    function getSign() external view returns (string memory) {
        require(signed, "Document unsigned");
        return tokenURI(tokenId);
    }
}
