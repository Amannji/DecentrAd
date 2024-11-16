//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

interface IPublisher {

    /**
     * @notice Struct of possible states of advertise
     */
    enum AdvStatus {
        PENDING_APPROVAL,
        APPROVED,
        REJECTED,
        STOPPED
    }

    /**
     * @dev Emitted when adv space is created with (`_advSpaceId`), of given (`_size`) and (`_pageURL`)
     */
    event AdvSpaceCreated(bytes32 indexed _advSpaceId, bytes32 indexed _size, string indexed _pageURL);
    
    /**
     * @dev Emitted when adv space of (`_advSpaceId`) is updated
     */
    event AdvSpaceUpdated(bytes32 indexed _advSpaceId);

    /**
     * @dev Emitted when adv space of (`_advSpaceId`) is enabled or disabled with bool (`_isEnabled`)
     */
    event AdvSpaceStatusChanged(bytes32 indexed _advSpaceId, bool indexed _isEnabled);

    /**
     * @dev Emitted when adv of ID (`_advId) is added to space of (`_advSpaceId`) by (`_advertiser`)
     */
    event AdvAddedToAdvSpace(bytes32 indexed _advSpaceId, bytes32 indexed _advId, address indexed _advertiser);

    /**
     * @dev Emitted when adv of ID (`_advId) is approved by moderator or publisher of address (`_approvedBy`)
     */
    event AdvApproved(bytes32 indexed _advId, address indexed _approvedBy);

    /**
     * @dev Emitted when adv of ID (`_advId) is rejected by moderator or publisher of address (`_rejectedBy`)
     */
    event AdvRejected(bytes32 indexed _advId, address indexed _rejectedBy);
    
    /**
     * @dev Emitted when adv of ID (`_advId) is stopped by moderator/publisher/advertiser of address (`_stoppedBy`)
     */
    event AdvStopped(bytes32 indexed _advId, address indexed _stoppedBy);

    /**
     * @dev Emitted when adv of ID (`_advId) is restarted by moderator/publisher/advertiser of address (`_restartedBy`)
     */
    event AdvRestarted(bytes32 indexed _advId, address indexed _restartedBy);

    /**
     * @dev Emitted when content of adv of ID (`_advId) is updated
     */    
    event AdvContentUpdated(bytes32 indexed _advId);

    /**
     * @dev Emitted when payment rate of adv of ID (`_advId) is updated from (`_prevPayRate`) to (`_newPayRate`)
     */  
    event AdvPaymentUpdated(bytes32 indexed _advId, uint256 indexed _prevPayRate, uint256 indexed _newPayRate);

    /**
     * @dev Emitted when (`_amount`) of ERC20 tokens are deposited to adv of ID (`_advId)
     */  
    event TokensDeposited(bytes32 indexed _advId, uint256 indexed _amount);

    /**
     * @dev Emitted when publisher withdraws balance of ads of ids (`_advIds`) with total (`_amount`) of tokens
     */  
    event PublisherWithdraw(bytes32[] indexed _advIds, uint256 indexed _amount);

    /**
     * @dev Emitted when advertiser withdraws balance of adv of id (`_advId`) with (`_amount`) of tokens
     */  
    event AdvertiserWithdraw(bytes32 indexed _advId, uint256 indexed _amount);
    
    /**
     * @dev Emitted when moderators with (`_modAddress`) are added 
     */  
    event ModeratorAdded(address[] indexed _modAddress);

    /**
     * @dev Emitted when moderators with (`_modAddress`) are removed 
     */  
    event ModeratorRemoved(address[] indexed _modAddress);

    /**
     * @dev It is called by PublisherFactory contract with new publisher contract is to created
     * @param _pageURL is page URL of publisher's website
     * @param _description is description set by publisher
     * @param _erc20TokenAddress is ERC20 token contract address which are supposed to be used as for transactions
     * @param _platformFeeAddress is address set by platform to receive deposit fees
     * @param _platformFeesPercentInBPS is number of percents to be cut as deposit fee in basis point system, example for 3% -> 300
     * @param _pubFactoryAddr is address of publisher factory contract
     */
    function initialize(
        string memory _pageURL,
        string memory _description,
        address _erc20TokenAddress,
        address _publisher,
        address _platformFeeAddress,
        uint256 _platformFeesPercentInBPS,
        address _pubFactoryAddr
    ) external;

    /**
     * @dev Creates advertise and adds it to adv space
     * @param _advSpaceId is Id of adv space in which adv is to be added
     * @param _advTitle is title of adv
     * @param _advText is text to of adv 
     * @param _ipfsHashes is array of ipfs links to which content like image/GIF/video is added for adv
     * @param _paymentRatePerSec is rate at which tokens should be spent for adv per second 
     * @param _depositAmount is total amount of tokens to deposit for adv spending, in wei.
     * @param _advLink is link to which users can redirected on clicking the adv
     *
     * Emits a {AdvAddedToAdvSpace} event.
     */
    function createAdvAndAddToAdvSpace(
        bytes32 _advSpaceId,
        string memory _advTitle,
        string memory _advText,
        string[] memory _ipfsHashes,
        uint256 _paymentRatePerSec,
        uint256 _depositAmount,
        string memory _advLink
    ) external payable;

    /**
     * @dev Creates adv space 
     * @param _size is size of adv space
     * @param _pageURL is page URL of adv space
     * @param _moderationFees is moderation fee for moderating adv on this adv space
     * @param _description is the description of adv space
     *
     * Emits a {AdvSpaceCreated} event.
     */
    function createAdvSpace(
        bytes32 _size,
        string memory _pageURL,
        uint256 _moderationFees,
        string memory _description
    ) external;

    /**
     * @dev Updates adv space 
     * @param _advSpaceId is Id of adv space
     * @param _size is updated size of adv space
     * @param _pageURL is updated page URL of adv space
     * @param _moderationFees is updated moderation fee for moderating adv on this adv space
     * @param _description is the updated description of adv space
     *
     * Emits a {AdvSpaceUpdated} event.
     */
    function updateAdvSpace(
        bytes32 _advSpaceId,
        bytes32 _size,
        string memory _pageURL,
        uint256 _moderationFees,
        string memory _description
    ) external;

    /**
     * @dev Adds one or more moderators to publisher's website
     * @param _modAddresses is array of moderator addresses to be added
     *
     * Emits a {ModeratorAdded} event.
     */
    function addModerators(address[] memory _modAddresses)
        external;
    /**
     * @dev Removes one or more moderators from publisher's website
     * @param _modAddresses is array of moderator addresses to be removed
     *
     * Emits a {ModeratorRemoved} event.
     */
    function removeModerators(address[] memory _modAddresses) external;

    /**
     * @dev Adds token balance to advertise
     * @param _advId is Id  of advertise to which tokens should be added
     * @param _amount is number of token in wei to be deposited
     *
     * Emits a {TokensDeposited} event.
     */
    function depositForAdv(bytes32 _advId, uint256 _amount) external;

    /**
     * @dev Approves advertise to make it active
     * @param _advId is Id  of advertise 
     *
     * Emits a {AdvApproved} event.
     */
    function approveAdv(bytes32 _advId) external;

    /**
     * @dev Rejects advertise 
     * @param _advId is Id  of advertise 
     *
     * Emits a {AdvRejected} event.
     */
    function rejectAdv(bytes32 _advId) external;

    /**
     * @dev Stops advertise and makes it inactive
     * @param _advId is Id  of advertise 
     *
     * Emits a {AdvStopped} event.
     */
    function stopAdv(bytes32 _advId) external;


    /**
     * @dev Restarts advertise and makes it active
     * @param _advId is Id  of advertise 
     *
     * Emits a {AdvRestarted} event.
     */
    function restartAdv(bytes32 _advId) external;

    /**
     * @dev Updates the content of advertise
     * @param _advId is Id  of advertise 
     * @param _advText is updated text of advertise
     * @param _ipfsHashes is updated ipfs hash links of advertise 
     * @param _advLink is updated link of advertise
     * @notice older ipfs hashes will be replaced by new ones
     *
     * Emits a {AdvContentUpdated} event.
     */
    function updateAdvContent(
        bytes32 _advId,
        string memory _advText,
        string memory _advTitle,
        string[] memory _ipfsHashes,
        string memory _advLink
    ) external;

    /**
     * @dev Updates the payment rate of advertise
     * @param _advId is Id  of advertise 
     * @param _paymentRatePerSec is updated payment rate per second in wei
     *
     * Emits a {AdvPaymentUpdated} event.
     */
    function updateAdvPayment(bytes32 _advId, uint256 _paymentRatePerSec)
        external;

    /**
     * @dev Withdraws the publisher's token balance of advs 
     * @param _advIds is array of advIds
     *
     * Emits a {PublisherWithdraw} event.
     */
    function withdrawPublisher(bytes32[] memory _advIds) external;

    /**
     * @dev Withdraws the advertiser's token balance of adv
     * @param _advId is id of advertise 
     * @param _amount is number of tokens to be withdrawn
     *
     * Emits a {AdvertiserWithdraw} event.
     */
    function withdrawAdvertiser(bytes32 _advId, uint256 _amount) external;
    
    /**
     * @dev Fetches adv Ids of given advertiser
     * @param _advertiserAddr is wallet address if advertiser
     * @return array of advIds
     */ 
    function getAdvIdsOfAdvertiser(address _advertiserAddr)
        external
        view
        returns (bytes32[] memory);

    /**
     * @dev Fetches adv Ids of given adv space
     * @param _advSpaceId is Id of adv space
     * @return array of advIds
     */ 
    function getAdvIdsOfAdvSpace(bytes32 _advSpaceId)
        external
        view
        returns (bytes32[] memory);

    /**
     * @dev Checks if adv is active or not at current timestamp
     * @param _advId is Id of adv 
     * @return bool true or false If adv is active
     */ 
    function getIfAdvIsActive(bytes32 _advId) external view returns (bool);

    /**
     * @dev Checks if adv is active or not at current timestamp
     * @param _advId is Id of adv 
     * @return balance amount of token balance in wei
     */ 
    function advDepositAmount(bytes32 _advId)
        external
        view
        returns (uint256 balance);

}