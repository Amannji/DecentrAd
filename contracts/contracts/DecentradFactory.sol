//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IDecentrad.sol";

contract DecentradFactory is Ownable {
    /**
     * @notice The deployed contract address of publisher implementation.
     */
    address public implementation;
    uint256 public platformFeesPercentInBPS;
    address public platformFeeAddress;

    /**
     * @notice Struct for Publisher clone contract
     */
    struct PublisherClone {
        string siteURL;
        address cloneAddress;
    }

    /**
     * @notice Array of the all publisher contract addresses.
     */
    PublisherClone[] public allPublisherClones;

    /**
     * @notice Mapping of the publiusher's clone address to publisherClones array index
     * mapping cloneAddress => cloneIndex in array publisherClones
     */
    mapping(address => uint256) internal _cloneIndex;

    /**
     * @notice Mapping of the publiusher's wallet address to publisher clone .
     * mapping publisher's walletAddress => array of publisher clones
     */
    mapping(address => PublisherClone[]) public publisherClones;

    /**
     * @notice Mapping of the moderator's wallet address to publisher clone contract address.
     * mapping moderator's walletAddress => array of clone contracts where moderator is added
     */
    mapping(address => address[]) internal _moderatorContracts;

    /**
     * @notice Mapping of the moderator address to publisher clone contract address to index of _moderatorContracts.
     * mapping moderator's walletAddress => clone contract address => index in _moderatorContracts
     */
    mapping(address => mapping( address => uint256)) public moderatorAccContractsPointer;
    
    /**
     * @notice Mapping of the moderator to if clone contract address is added to _moderatorContracts.
     * mapping moderator's walletAddress => clone contract address => true/false 
     */
    mapping(address => mapping(address => bool)) public isAddedToModeratorContracts;
    
    /**
     * @notice Mapping of the advertiser's wallet address to clone contract address.
     * mapping walletAddress => array of clone contracts     
     */
    mapping(address => address[]) internal _advertiserContracts;
    
    /**
     * @notice Mapping of the advertiser to clone contract address to if it is added to _advertiserContracts.
     * mapping advertiser walletAddress => clone contract => true/false
     */
    mapping(address => mapping(address => bool)) public isAddedToAdvertiserContracts;

    /**
     * @notice If Publisher has already created clone contract with sending wallet address
     * @param publisherAddress wallet address of publisher.
     * @param cloneAddress already deployed publisher contract address.
     */
    error PubCloneContractExists(address publisherAddress, address cloneAddress);


    event CloneCreated(uint256 date, string message, address cloneAddress);

    /**
     * @dev Throws if the _implementation is invalid address.
     * @param _implementation contract address of the deployed publisher contract.
     *
     * Requirements:
     * - `_implementation` cannot be the zero address.
     * - `_platformFeeAddress` cannot be the zero address.
     */
    constructor(
        address _implementation,
        address _platformFeeAddress,
        uint256 _platformFeesPercentInBPS
    ) Ownable(msg.sender) {
        require(
            _implementation != address(0),
            "invalid implementation address"
        );
        require(
            _platformFeeAddress != address(0),
            "invalid platformFeeAddress"
        );
        implementation = _implementation;
        platformFeeAddress = _platformFeeAddress;
        platformFeesPercentInBPS = _platformFeesPercentInBPS;
    }

    /**
     * @notice to upgrade the implementation contract
     * @param _implementation new publisher implementation contract address
     *
     * Requirements:
     * - `_implementation` cannot be the zero address.
     */
    function upgradeImplementationContract(address _implementation)
        external
        onlyOwner
    {
        require(
            _implementation != address(0),
            "invalid implementation address"
        );
        implementation = _implementation;
    }

    /**
     * @notice Creates the clone of publisher contract.
     * @dev Throws if pageURL or ERC20 token address in invalid

     * @param _siteURL The main website URL.
     * @param _description The description related to Publisher.
     * @param _erc20TokenAddress The token address if ERC token that publisher wants to receive as fees.
     *
     * Requirements:
     * - `_siteURL` cannot be empty.
     * - `_erc20TokenAddress` cannot be the zero address.
     */
    function createPublisherClone(
        string memory _siteURL,
        string memory _description,
        address _erc20TokenAddress
    ) external {
        require(bytes(_siteURL).length > 0, "invalid siteURL");
        require(_erc20TokenAddress != address(0), "invalid erc20 tokenAddress");

        bytes32 salt = keccak256(abi.encodePacked(_siteURL));
        address pubCloneContract = Clones.cloneDeterministic(
            implementation,
            salt
        );
        IDecentrad(pubCloneContract).initialize(
            _siteURL,
            _description,
            _erc20TokenAddress,
            msg.sender,
            platformFeeAddress,
            platformFeesPercentInBPS,
            address(this)
        );
        PublisherClone memory _pubClone = PublisherClone(
            _siteURL,
            pubCloneContract
        );
        publisherClones[msg.sender].push(_pubClone);
        _cloneIndex[pubCloneContract] = publisherClones[msg.sender].length - 1;
        allPublisherClones.push(_pubClone);
        emit CloneCreated(block.timestamp, "Clone created", pubCloneContract);
    }

    /**
     * @notice to reset the platform fees percent amount
     * @param _percentInBPS The percentage in BPS format, example: 3% -> 300
     */
    function setPlatforFeesPercentInBPS(uint256 _percentInBPS)
        external
        onlyOwner
    {
        platformFeesPercentInBPS = _percentInBPS;
    }

    /**
     * @notice to reset the platform fees receiver address
     * @param _feeAddress The address to receive deposit fess
     *
     * Requirements:
     * - `_feeAddress` cannot be the zero address.
     */
    function setPlatformFeeAddress(address _feeAddress) external onlyOwner {
        require(_feeAddress != address(0), "invalid feeAddress");
        platformFeeAddress = _feeAddress;
    }

    /**
     * @notice Returns details of clone contract.
     * @param _pubWalletAddress The wallet address of publisher.
     * @param _cloneAddress The address of clone.
     * @return The struct of PublisherClone.
     */
    function getClone(address _pubWalletAddress, address _cloneAddress)
        public
        view
        returns (PublisherClone memory)
    {
        uint256 index = _cloneIndex[_cloneAddress];
        return publisherClones[_pubWalletAddress][index];
    }

    /**
     * @notice Returns all the clone contract address created by factory.
     * @return The array of addresses of publishers' clone contracts.
     */
    function getAllPublisherContracts()
        public
        view
        returns (PublisherClone[] memory)
    {
        return allPublisherClones;
    }

    /**
     * @notice Returns all the clone contracts of a publihser's wallet address.
     * @return The array of addresses of publisher's clone contracts.
     */
    function getAllPubClonesByAddress(address _pubWalletAddress)
        public
        view
        returns (PublisherClone[] memory)
    {
        return publisherClones[_pubWalletAddress];
    }

    /**
     * @notice Returns total count of all publisher clones created by factory.
     * @return The number of total publisher clone contracts.
     */
    function getPubContractCount() public view returns (uint256) {
        return allPublisherClones.length;
    }

    /**
     * @notice Returns total count of publisher's clones.
     * @return The number of total clone contracts of a given publisher.
     */
    function getPubContractCountByAddress(address _pubWalletAddress)
        public
        view
        returns (uint256)
    {
        return publisherClones[_pubWalletAddress].length;
    }

    /**
     * @notice adds publiser contract address to advertiseContracts array
     * @param _advAddress The wallet address of advertiser.
     * @param _contractAddress The address of clone.
     * @param _publisher The wallet address of publihser.
     *
     * Requirements:
     * - `_advAddress` cannot be the zero address.
     * - `_contractAddress` cannot be the zero address.
     * - `_publisher` cannot be the zero address.
     */
    function assignContractToAdvertiser(
        address _advAddress,
        address _contractAddress,
        address _publisher
    ) external {
        require(_advAddress != address(0), "invalid advertiser address");
        require(_contractAddress != address(0), "invalid contractAddress");
        require(_publisher != address(0), "invalid publisher address");
        _checkIfCallerIsClone(_contractAddress, _publisher);
        if (!isAddedToAdvertiserContracts[_advAddress][_contractAddress]) {
            isAddedToAdvertiserContracts[_advAddress][_contractAddress] = true;
            _advertiserContracts[_advAddress].push(_contractAddress);
        }
    }

    /**
     * @notice adds publiser contract address to moderatorContracts array
     * @param _modAddress The wallet address of moderator.
     * @param _contractAddress The address of clone.
     * @param _publisher The wallet address of publihser.
     *
     * Requirements:
     * - `_modAddress` cannot be the zero address.
     * - `_contractAddress` cannot be the zero address.
     * - `_publisher` cannot be the zero address.
     */
    function assignPubContractToModerator(
        address _modAddress,
        address _contractAddress,
        address _publisher
    ) external {
        require(_modAddress != address(0), "invalid moderator address");
        require(_contractAddress != address(0), "invalid contractAddress");
        require(_publisher != address(0), "invalid publisher address");
        
        _checkIfCallerIsClone(_contractAddress, _publisher);
        if (!isAddedToModeratorContracts[_modAddress][_contractAddress]) {
            _moderatorContracts[_modAddress].push(_contractAddress);
            moderatorAccContractsPointer[_modAddress][_contractAddress] =
                _moderatorContracts[_modAddress].length - 1;
            isAddedToModeratorContracts[_modAddress][_contractAddress] = true;
        }
    }

    /**
     * @notice removes publiser contract address from moderatorContracts array
     * @param _modAddress The wallet address of moderator.
     * @param _contractAddress The address of clone.
     * @param _publisher The wallet address of publihser.
     *
     * Requirements:
     * - `_modAddress` cannot be the zero address.
     * - `_contractAddress` cannot be the zero address.
     * - `_publisher` cannot be the zero address.
     */
    function removePubContractOfModerator(
        address _modAddress,
        address _contractAddress,
        address _publisher
    ) external {
        require(_modAddress != address(0), "invalid moderator address");
        require(_contractAddress != address(0), "invalid contractAddress");
        require(_publisher != address(0), "invalid publisher address");
        _checkIfCallerIsClone(_contractAddress, _publisher);
        _moderatorContracts[_modAddress][
            moderatorAccContractsPointer[_modAddress][_contractAddress]
        ] = _moderatorContracts[_modAddress][
            _moderatorContracts[_modAddress].length - 1
        ];

        moderatorAccContractsPointer[_modAddress][_moderatorContracts[_modAddress][
            _moderatorContracts[_modAddress].length - 1
        ]] = moderatorAccContractsPointer[_modAddress][_contractAddress];
        
        _moderatorContracts[_modAddress].pop();
        isAddedToModeratorContracts[_modAddress][_contractAddress] = false;
    }

    /**
     * @notice Returns publisher's contract addresses of moderator.
     * @return The array of contract addresses of a given moderator.
     */
    function getPubContractsOfModerator(address _modAddress)
        external
        view
        returns (address[] memory)
    {
        return _moderatorContracts[_modAddress];
    }

    /**
     * @notice Returns publisher's contract addresses of advertiser.
     * @return The array of contract addresses of a given advertiser.
     */
    function getCloneContractsOfAdvertiser(address _advAddress)
        external
        view
        returns (address[] memory)
    {
        return _advertiserContracts[_advAddress];
    }

    /**
     * @notice This internal function checks if function caller is  publisher contract addresses.
     * @dev throws if caller is not a publisher contract address
     */
    function _checkIfCallerIsClone(address _contractAddress, address _publisher)
        internal
        view
    {
        PublisherClone memory _clone = getClone(_publisher, _contractAddress);
        require(
            _clone.cloneAddress == _contractAddress &&
                msg.sender == _contractAddress,
            "caller can be publisher contract only"
        );
    }
}