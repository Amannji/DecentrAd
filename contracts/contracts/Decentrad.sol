//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./IDecentrad.sol";
import "./DecentradFactory.sol";

contract Decentrad is
    IDecentrad,
    Initializable,
    ReentrancyGuard,
    AccessControl
{
    using SafeERC20 for IERC20;
    string public siteURL;
    string public description;
    IERC20 public erc20TokenAddress;
    uint256 public advSpaceCount;
    uint256 public platformFeesPercentInBPS;
    address public platformFeeAddress;
    bytes32[] internal _allAdvSpaceIds;
    address public publisher;
    address internal _factoryAddress;
    uint256 public totalAdvCount;
    address[] public moderators;

    bytes32 public constant MODERATOR = keccak256("MODERATOR");
    uint32 private constant MAX_MODS_COUNT = 20;

    struct AdvSpace {
        bytes32 size;
        string pageURL;
        uint256 moderationFees;
        string description;
        bool isEnabled;
    }

    struct ActiveDuration {
        uint256 startTime;
        uint256 stopTime;
        uint256 payRatePerSecond;
    }

    struct Advertise {
        bytes32 advSpaceId;
        address advertiser;
        string advTitle;
        string advText;
        AdvStatus advStatus;
        string[] ipfsHashes;
        uint256 paymentRatePerSec;
        string advLink;
    }

    //mapping of advspaceId to adv space
    mapping(bytes32 => AdvSpace) internal _advSpaces;

    // mapping of advertisers wallet address to advertise
    mapping(bytes32 => Advertise) internal _advertises;

    // mapping of advertiser's wallet to advIds
    mapping(address => bytes32[]) private _advertiserToAds;

    // mapping of adv spaces to advIds
    mapping(bytes32 => bytes32[]) private _advSpacesToAds;

    // mapping of advId to start and stop times
    mapping(bytes32 => ActiveDuration[]) internal _advDurationCycles;

    // mapping of advId to deposited amount for advertise
    mapping(bytes32 => uint256) internal  _advDepositAmount;

    // mapping of advId to publisher withdrawn balance
    mapping(bytes32 => uint256) public advPubWithdrawnAmt;

    // mapping of advId to advertiser withdrawn balance
    mapping(bytes32 => uint256) public advAdvertiserWithdrawnAmt;

    // mapping of advId to if moderation fees paid
    mapping(bytes32 => address) public advIdToModeratorPaid;

    // mapping of moderator address to total received moderation fees
    mapping(address => uint256) public moderatorRecvdFees;

    // mapping of moderator to index of moderators array
    mapping(address => uint256) internal _moderatorArrayPointer;

    // mapping of advId to if it is stopped by advertiser
    mapping(bytes32 => bool) internal _isAdvStoppedByAdvertiser;
    
    /**
     * @dev Checks if sender has Moderator role     
     */
    modifier onlyModerator() {
        require(hasRole(MODERATOR, msg.sender), "need moderator access");
        _;
    }

    /**
     * @dev Checks if sender is Publisher who deployed contract
     */
    modifier onlyPublisher() {
        require(publisher == msg.sender, "caller not publisher");
        _;
    }

    /**
     * @dev Checks if sender is Advertiser or Has a Moderator role
     * @notice Publisher by default gets Moderator role
     */
    modifier onlyModOrAdvertOfAdv(bytes32 _advId) {
        require(msg.sender == publisher || hasRole(MODERATOR, msg.sender) || msg.sender == _advertises[_advId].advertiser, "caller is not mod or advertiser");
        _;
    }

    /**
     * @dev Checks if sender is Advertiser of given adv
     * @param _advId is Id of advertise
     */
    modifier onlyAdvertiserOfAdv(bytes32 _advId) {
        require(
            msg.sender == _advertises[_advId].advertiser,
            "only accessible to advertiser"
        );
        _;
    }

    /**
     * @dev Error in case adv space doesn't exist
     * @param advSpaceId is Id of adv space
     */
    error advSpaceDoesntExist(bytes32 advSpaceId);

    /**
     * @dev Error in case adv doesn't exist
     * @param advId is Id of adv
     */
    error advertiseDoesntExist(bytes32 advId);

    /**
     * @dev Error in case adv balance is zero
     * @param advIds is array of advIds
     * @param walletAddr is address of publisher
     */
    error zeroBalanceForAdv(bytes32[] advIds, address walletAddr);

    /**
     * @dev Error in case advId doesn't exist
     * @param advId is Id adv
     */
    error advIdAlreadyExist(bytes32 advId);

    /**
     @dev _disableInitializers prevents initialization of the implementation contract itself
    */
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev See {IDecentrad-initialize}.
     */
    function initialize(
        string memory _siteURL,
        string memory _description,
        address _erc20TokenAddress,
        address _publisher,
        address _platformFeeAddress,
        uint256 _platformFeesPercentInBPS,
        address _pubFactoryAddr
    ) public initializer {
        siteURL = _siteURL;
        description = _description;
        erc20TokenAddress = IERC20(_erc20TokenAddress);
        publisher = _publisher;
        platformFeeAddress = _platformFeeAddress;
        platformFeesPercentInBPS = _platformFeesPercentInBPS;
        _factoryAddress = _pubFactoryAddr;

        _grantRole(DEFAULT_ADMIN_ROLE, publisher);
        _grantRole(MODERATOR, publisher);
        _setRoleAdmin(MODERATOR, DEFAULT_ADMIN_ROLE);
    }

    /**
     * @notice Updates website URL of Publisher's contract
     * @param _newSiteURL is new page URL of publisher's website
     *
     * Requirements:
     * - `totalAdvCount` cannot be greater than zero, means siteURL can be updated only if no adv is added to contract.
     * - `_newSiteURL` cannot be empty
     */
    function updateSiteURL(string memory _newSiteURL) external onlyPublisher {
        require(totalAdvCount == 0, "cannot update siteURL");
        require(bytes(_newSiteURL).length != 0, "newSiteURL can't be empty");
        siteURL = _newSiteURL;
    }

    /**
     * @notice Updates description Publisher's contract
     * @param _newDescription is new description for publisher's website
     *
     * NOTE: `_newDescription` can be empty string
     */
    function updateDescription(string memory _newDescription)
        external
        onlyPublisher
    {
        description = _newDescription;
    }

    /**
     * @notice See {IDecentrad-createAdvSpace}.
     *
     * Requirements:
     * - `_pageURL` cannot be empty
     * - only publisher who deployed the contract can call this function
     */
    function createAdvSpace(
        bytes32 _size,
        string memory _pageURL,
        uint256 _moderationFees,
        string memory _description
    ) external onlyPublisher {
        require(bytes(_pageURL).length != 0, "_pageURL can't be empty");
        AdvSpace memory _advSpace = AdvSpace(
            _size,
            _pageURL,
            _moderationFees,
            _description,
            true
        );
        advSpaceCount++;
        bytes32 advSpaceId = getAdvSpaceId(msg.sender, advSpaceCount);
        _advSpaces[advSpaceId] = _advSpace;
        _allAdvSpaceIds.push(advSpaceId);

        emit AdvSpaceCreated(advSpaceId, _size, _pageURL);
    }

    /**
     * @notice See {IDecentrad-updateAdvSpace}.
     *
     * NOTE: 
     * - updates if `_size` is different than previous size
     * - updates if `_pageURL` is not empty
     * - updates if `_description` is not empty
     * - updates if `_moderationFees` is different than previous fees
     * - only publisher who deployed the contract can call this function
     */
    function updateAdvSpace(
        bytes32 _advSpaceId,
        bytes32 _size,
        string memory _pageURL,
        uint256 _moderationFees,
        string memory _description
    ) external onlyPublisher {
        _checkIfAdvSpaceExists(_advSpaceId);
        AdvSpace memory _advSpace = _advSpaces[_advSpaceId];
        if (_advSpace.size != _size) _advSpace.size = _size;
        if (bytes(_pageURL).length > 0) _advSpace.pageURL = _pageURL;
        if (bytes(_description).length > 0) _advSpace.description = _description;
        if (_moderationFees != _advSpace.moderationFees) _advSpace.moderationFees = _moderationFees;

        _advSpaces[_advSpaceId] = _advSpace;
        
        emit AdvSpaceUpdated(_advSpaceId);
    }

    /**
     * @notice Updates status of adv space if enabled or disabled
     * @param _advSpaceId is id of adv space
     * @param _isEnabled is true if adv space is to be enabled, false if adv space is to be disabled
     *
     * NOTE: 
     * - only publisher who deployed the contract can call this function
     */
    function setAdvSpaceStatus(bytes32 _advSpaceId, bool _isEnabled) external onlyPublisher {
        _advSpaces[_advSpaceId].isEnabled = _isEnabled;
        emit AdvSpaceStatusChanged(_advSpaceId, _isEnabled);
    }

    /**
     * @notice See {IDecentrad-createAdvAndAddToAdvSpace}.
     *
     * Requirements: 
     * - adv space should be enabled
     * - `_advTitle` cannot be empty
     * - `_advText` cannot be empty
     * - `_paymentRatePerSec` cannot be zero
     * NOTE: transfers platform deposit fee to platform fee address
     * external call to DecentradFactory.assignContractToAdvertiser to add contract to advertiserContracts in Factory
     */
    function createAdvAndAddToAdvSpace(
        bytes32 _advSpaceId,
        string memory _advTitle,
        string memory _advText,
        string[] memory _ipfsHashes,
        uint256 _paymentRatePerSec,
        uint256 _depositAmount,
        string memory _advLink
    ) external payable nonReentrant{
        require(_advSpaces[_advSpaceId].isEnabled, "advspace disabled");
        require(bytes(_advTitle).length != 0, "invalid title");
        require(bytes(_advText).length != 0, "invalid text");
        require(_paymentRatePerSec != 0, "pay rate cannot be zero(0)");

        _checkIfAdvSpaceExists(_advSpaceId);

        bytes32 advId = getAdvId(msg.sender, _advTitle, _advSpaceId);
        if (_advertises[advId].advSpaceId != bytes32(0))
            revert advIdAlreadyExist({advId: advId});

        Advertise memory _adv = Advertise(
            _advSpaceId,
            msg.sender,
            _advTitle,
            _advText,
            AdvStatus(0),
            _ipfsHashes,
            _paymentRatePerSec,
            _advLink
        );
        _advertises[advId] = _adv;
        _advertiserToAds[msg.sender].push(advId);
        _advSpacesToAds[_advSpaceId].push(advId);
        totalAdvCount += 1;
        _advDurationCycles[advId].push(ActiveDuration(0, 0, _paymentRatePerSec));

        uint256 platformFees = (_depositAmount * platformFeesPercentInBPS) /
            10000;
        uint256 depositToAdv = _depositAmount - platformFees;

        _advDepositAmount[advId] = depositToAdv;

        _tranferERC20Amount(msg.sender, address(this), depositToAdv);
        _tranferERC20Amount(msg.sender, platformFeeAddress, platformFees);

        DecentradFactory(_factoryAddress).assignContractToAdvertiser(
            msg.sender,
            address(this),
            publisher
        );

        emit AdvAddedToAdvSpace(_advSpaceId, advId, msg.sender);
    }

    /**
     * @notice See {IDecentrad-depositForAdv}.
     *
     * Requirements: 
     * - adv space should be enabled
     * NOTE: transfers platform deposit fee to platform fee address
     */
    function depositForAdv(bytes32 _advId, uint256 _amount)
        external
        onlyAdvertiserOfAdv(_advId)
        nonReentrant
    {
        require(_advSpaces[_advertises[_advId].advSpaceId].isEnabled, "advspace disabled");
        uint256 platformFees = (_amount * platformFeesPercentInBPS) / 10000;
        uint256 depositAmt = _amount - platformFees;

        uint256 advertiserCurrBal = balOfAdvertiserByAdvId(_advId);
         _advDepositAmount[_advId] += depositAmt;
        
        if (_advDurationCycles[_advId].length > 1 && _advertises[_advId].advStatus == AdvStatus(1)){
            if(advertiserCurrBal != 0)
                _updateEndDurationForAdv(_advId, false);
            else   
                _setDurationForAdv(_advId);
        }
           
        _tranferERC20Amount(msg.sender, address(this), depositAmt);
        _tranferERC20Amount(msg.sender, platformFeeAddress, platformFees);

        emit TokensDeposited(_advId, depositAmt);
    }

    /**
     * @notice See {IDecentrad-approveAdv}.
     *
     * Requirements: 
     * - adv space should be enabled
     * - adv shouldn't be already approved
     * NOTE: transfers moderator fee to moderator address, fee is send only once to first moderator who does the moderation action
     */
    function approveAdv(bytes32 _advId)
        external
        onlyModerator
        nonReentrant
    {
        require(_advSpaces[_advertises[_advId].advSpaceId].isEnabled, "advspace disabled");
        require(
            _advertises[_advId].advStatus != AdvStatus(1),
            "Adv already approved"
        );
        _setAdvStatus(_advId, AdvStatus(1));
        _payModerator(_advId, _advertises[_advId].advSpaceId);

        emit AdvApproved(_advId, msg.sender);
    }

    /**
     * @notice See {IDecentrad-rejectAdv}.
     *
     * Requirements: 
     * - adv shouldn't be already approved or rejected
     * NOTE: transfers moderator fee to moderator address, fee is send only once to first moderator who does the moderation action
     */
    function rejectAdv(bytes32 _advId)
        external
        onlyModerator
        nonReentrant
    {
        require(
            _advertises[_advId].advStatus != AdvStatus(2),
            "Adv already rejected"
        );
        require(
            _advertises[_advId].advStatus != AdvStatus(1),
            "Adv already approved"
        );
        _setAdvStatus(_advId, AdvStatus(2));
        _payModerator(_advId, _advertises[_advId].advSpaceId);

        emit AdvRejected(_advId, msg.sender);
    }

    /**
     * @notice See {IDecentrad-stopAdv}.
     *
     * Requirements: 
     * - adv shouldn't be already stopped
     * - adv shouldn be in active state
     */
    function stopAdv(bytes32 _advId) external onlyModOrAdvertOfAdv(_advId) {
        require(
            _advertises[_advId].advStatus != AdvStatus(3),
            "Adv already stopped"
        );
        require(_advertises[_advId].advStatus == AdvStatus(1), "Adv not active");
        _setAdvStatus(_advId, AdvStatus(3));
        
        if(msg.sender ==  _advertises[_advId].advertiser)
            _isAdvStoppedByAdvertiser[_advId] = true;

        emit AdvStopped(_advId, msg.sender);
    }

    /**
     * @notice See {IDecentrad-restartAdv}.
     *
     * Requirements: 
     * - adv space should be enabled
     * - adv shouldn be in stopped state
     */
    function restartAdv(bytes32 _advId)
        external
        onlyModOrAdvertOfAdv(_advId)
    {
        require(_advSpaces[_advertises[_advId].advSpaceId].isEnabled, "advspace disabled");
        require(
            _advertises[_advId].advStatus == AdvStatus(3),
            "adv not stopped"
        );
       require((_isAdvStoppedByAdvertiser[_advId] && msg.sender == _advertises[_advId].advertiser) || (!_isAdvStoppedByAdvertiser[_advId] && msg.sender != _advertises[_advId].advertiser), "cannot restart");
       
        _setAdvStatus(_advId, AdvStatus(1));

        emit AdvRestarted(_advId, msg.sender);
    }

    /**
     * @notice See {IDecentrad-updateAdvContent}.
     *
     * NOTE: 
     * - updates if `_advText` is not empty
     * - updates if `_advTitle` is not empty
     * - updates if `_ipfsHashes` array is not empty
     * - updates if `_advLink`  is not empty
     * - only advertise who added adv in the contract can update the content
     */
    function updateAdvContent(
        bytes32 _advId,
        string memory _advText,
        string memory _advTitle,
        string[] memory _ipfsHashes,
        string memory _advLink
    ) external onlyAdvertiserOfAdv(_advId) {
        Advertise memory _adv = _advertises[_advId];
        if (bytes(_advText).length > 0) _adv.advText = _advText;
        if (bytes(_advTitle).length > 0) _adv.advTitle = _advTitle;
        if (_ipfsHashes.length > 0) _adv.ipfsHashes = _ipfsHashes;
        if (bytes(_advLink).length > 0) _adv.advLink = _advLink;

        _setAdvStatus(_advId, AdvStatus(3));
        _adv.advStatus = AdvStatus(0);
        _advertises[_advId] = _adv;

        emit AdvContentUpdated(_advId);
    }

    /**
     * @notice See {IDecentrad-updateAdvPayment}.
     *
     * Requirements:
     * `_paymentRatePerSec` should be greater than zero.
     * NOTE: 
     * - updates if `_advText` is not empty
     * - updates if `_advTitle` is not empty
     * - updates if `_ipfsHashes` array is not empty
     * - updates if `_advLink`  is not empty
     * - only advertise who added adv in the contract can update the payment rate
     */
    function updateAdvPayment(bytes32 _advId, uint256 _paymentRatePerSec)
        external
        onlyAdvertiserOfAdv(_advId)
    {
        require(_paymentRatePerSec > 0, "invalid paymentRatePerSec");
        uint256 currBalanceOfAdv = balOfAdvertiserByAdvId(_advId);
        Advertise memory _adv = _advertises[_advId];
        uint256 _prevPayRate = _adv.paymentRatePerSec;
        _adv.paymentRatePerSec = _paymentRatePerSec;
        _advertises[_advId] = _adv;
        if (_adv.advStatus == AdvStatus(1)) {
            _setAdvStatus(_advId, AdvStatus(3));
            uint256 currTimestamp = block.timestamp;
            uint256 stopTimestamp = currTimestamp +
                (currBalanceOfAdv / _paymentRatePerSec);
            _advDurationCycles[_advId].push(
                ActiveDuration(currTimestamp, stopTimestamp, _paymentRatePerSec)
            );
            _advertises[_advId].advStatus = AdvStatus(1);
        }

        emit AdvPaymentUpdated(_advId, _prevPayRate, _paymentRatePerSec);
    }

    /**
     * @notice See {IDecentrad-withdrawPublisher}.
     *
     * NOTE: 
     * - only publisher who deployed contract can withdraw consumed token balance 
     */
    function withdrawPublisher(bytes32[] memory _advIds)
        external
        onlyPublisher
        nonReentrant
    {
        uint256 _totalAmount;
        for (uint32 i = 0; i < _advIds.length; i++) {
            uint256 _amt = balOfPubByAdvId(_advIds[i]);
            _totalAmount = _totalAmount + _amt;
            advPubWithdrawnAmt[_advIds[i]] += _amt;
        }
        if (_totalAmount == 0)
            revert zeroBalanceForAdv({advIds: _advIds, walletAddr: msg.sender});

        erc20TokenAddress.approve(address(this), _totalAmount);
        _tranferERC20Amount(address(this), publisher, _totalAmount);

        emit PublisherWithdraw(_advIds, _totalAmount);
    }

    /**
     * @notice See {IDecentrad-withdrawAdvertiser}.
     *
     * Requirements:
     * `_amount` should be greater than zero.
     * `_amount` should be less than remaining token balance of adv.
     * NOTE: 
     * - only advertise who added adv in the contract can withdraw remaining token balance of adv
     * transfers tokens to advertisers wallet address
     */
    function withdrawAdvertiser(bytes32 _advId, uint256 _amount)
        external
        onlyAdvertiserOfAdv(_advId)
        nonReentrant
    {
        require(_amount > 0, "invalid amount");
        uint256 _balance = balOfAdvertiserByAdvId(_advId);
        require(_amount <= _balance, "amount exceeds balance");
    
        advAdvertiserWithdrawnAmt[_advId] += _amount;
        if (
            _balance - _amount == 0 &&
            _advertises[_advId].advStatus == AdvStatus(1)
        ) {
            _setAdvStatus(_advId, AdvStatus(3));
        } else if (
            _balance - _amount > 0 &&
            _advertises[_advId].advStatus != AdvStatus(3)
        ) {
            _updateEndDurationForAdv(_advId, false);
        }
        erc20TokenAddress.approve(address(this), _amount);
        _tranferERC20Amount(address(this), msg.sender, _amount);

        emit AdvertiserWithdraw(_advId, _amount);
    }

    /**
     * @dev Internal function to add moderators
     * @param  _modAddresses is array of addresses of moderators
     * 
     * Requirements:
     * - Sum of Length of address added in `_modAddresses` and existing moderator addresses shouln't exceed MAX_MODS_COUNT
     */    
    function _addModerator(address[] memory _modAddresses) internal {
        require(
            _modAddresses.length + moderators.length <=
                MAX_MODS_COUNT,
            "max mod count exceeds"
        );

        for (uint32 i = 0; i < _modAddresses.length; i++) {
            if(_modAddresses[i] == address(0)) continue;
            if (!hasRole(MODERATOR, _modAddresses[i]))
                _grantRole(MODERATOR, _modAddresses[i]);
            moderators.push(_modAddresses[i]);
            _moderatorArrayPointer[_modAddresses[i]] = moderators.length - 1;

            DecentradFactory(_factoryAddress).assignPubContractToModerator(
                _modAddresses[i],
                address(this),
                publisher
            );
        }
         
        emit ModeratorAdded(_modAddresses);
    }

    /**
     * @notice See {IDecentrad-addModerators}.
     * NOTE: only publisher who deployed contract can add moderators
     */
    function addModerators(address[] memory _modAddresses)
        public
        onlyPublisher
        nonReentrant
    {
        _addModerator(_modAddresses);
    }

    /**
     * @notice See {IDecentrad-removeModerators}.
     * NOTE: only publisher who deployed contract can remove moderators
     */
    function removeModerators(address[] memory _modAddresses)
        public
        onlyPublisher
    {
        address[] storage _mods = moderators;
        for(uint32 i = 0; i<_modAddresses.length; i++){
            address _modAddress = _modAddresses[i];
            if(_modAddress == address(0)) continue;
            if(hasRole(MODERATOR, _modAddress)) revokeRole(MODERATOR, _modAddress);
            _mods[_moderatorArrayPointer[_modAddress]] = _mods[_mods.length - 1];
            _moderatorArrayPointer[_mods[_mods.length - 1]] = _moderatorArrayPointer[_modAddress];
            _mods.pop();

            DecentradFactory(_factoryAddress).removePubContractOfModerator(
                        _modAddress,
                        address(this),
                        publisher
            );
        }

        emit ModeratorRemoved(_modAddresses);
    }

    /**
     * @notice See {IDecentrad-balOfAdvertiserByAdvId}.
     */
    function balOfAdvertiserByAdvId(bytes32 _advId)
        public
        view
        returns (uint256 balance)
    {
        uint256 modFees = 0;
        if (advIdToModeratorPaid[_advId] != address(0)) {
            modFees = _advSpaces[_advertises[_advId].advSpaceId].moderationFees;
        }
        uint256 advConsumedAmt = _consumedByAdv(_advId);
        uint256 bufferAmt = 59 * _advertises[_advId].paymentRatePerSec;
        if (advConsumedAmt + modFees + bufferAmt >= advDepositAmount(_advId)) return 0;
        else return advDepositAmount(_advId) - advConsumedAmt - modFees;
    }

    /**
     * @notice See {IDecentrad-advDepositAmount}.
     */
    function advDepositAmount(bytes32 _advId)
        public
        view
        returns (uint256 balance)
    {
        return _advDepositAmount[_advId] - advAdvertiserWithdrawnAmt[_advId];
    }

    /**
     * @notice See {IDecentrad-balOfPubByAdvId}.
     */
    function balOfPubByAdvId(bytes32 _advId)
        public
        view
        returns (uint256 balance)
    {
        return _consumedByAdv(_advId) - advPubWithdrawnAmt[_advId];
    }

    /**
     * @notice Fetches duration cycles starttime-stoptime in which adv is active
     * @param _advId is id of adv
     * @return array of struct ActiveDuration
     */
    function getAdvDurationCycles(bytes32 _advId)
        external
        view
        returns (ActiveDuration[] memory)
    {
        return _advDurationCycles[_advId];
    }

    /**
     * @notice See {IDecentrad-getAdvIdsOfAdvertiser}.
     */
    function getAdvIdsOfAdvertiser(address _advertiserAddr)
        external
        view
        returns (bytes32[] memory)
    {
        return _advertiserToAds[_advertiserAddr];
    }

    /**
     * @notice See {IDecentrad-getAdvIdsOfAdvSpace}.
     */
    function getAdvIdsOfAdvSpace(bytes32 _advSpaceId)
        external
        view
        returns (bytes32[] memory)
    {
        return _advSpacesToAds[_advSpaceId];
    }

    /**
     * @notice Fetches adv details 
     * @param _advIds is array of advId
     * @return array of advertise details and true/false if adv is active or not 
     */
    function getAdsByIds(bytes32[] memory _advIds)
        external
        view
        returns (Advertise[] memory, bool[] memory)
    {
        uint256 currTimestamp = block.timestamp;
        bool[] memory _advIdsStatus = new bool[](_advIds.length);
        Advertise[] memory _ads = new Advertise[](_advIds.length);

        for (uint32 i = 0; i < _advIds.length; i++) {
            _ads[i] = _advertises[_advIds[i]];

            ActiveDuration memory _actLatestDur = _advDurationCycles[_advIds[i]][
                _advDurationCycles[_advIds[i]].length - 1];
            bool _isActive = currTimestamp >= _actLatestDur.startTime &&
            currTimestamp <= _actLatestDur.stopTime ? true : false;
            _advIdsStatus[i] = _isActive;
        }
        return (_ads,_advIdsStatus);
    }

    /**
     * @notice Fetches adv space details 
     * @param _advSpaceIds is array of advSpaceId
     * @return array of adv space details 
     */
    function getAdvSpacesByIds(bytes32[] memory _advSpaceIds)
        external
        view
        returns (AdvSpace[] memory)
    {
        AdvSpace[] memory _advSpace = new AdvSpace[](_advSpaceIds.length);
        for (uint32 i = 0; i < _advSpaceIds.length; i++) {
            _advSpace[i] = _advSpaces[_advSpaceIds[i]];
        }
        return _advSpace;
    }

    /**
     * @notice See {IDecentrad-getIfAdvIsActive}.
     */
    function getIfAdvIsActive(bytes32 _advId) external view returns (bool) {
        ActiveDuration memory _actLatestDur = _advDurationCycles[_advId][
            _advDurationCycles[_advId].length - 1
        ];
        uint256 currTimestamp = block.timestamp;

        return
            currTimestamp >= _actLatestDur.startTime &&
            currTimestamp <= _actLatestDur.stopTime;
    }

    /**
     * @notice Fetches all adv space Ids of contract 
     * @return array of adv space Ids 
     */
    function getAllAdvSpaceIds() public view returns (bytes32[] memory) {
        return _allAdvSpaceIds;
    }

    /**
     * @notice gets adv space Id 
     * @return advSpaceId of adv space
     */
    function getAdvSpaceId(address _pubAddress, uint256 _count)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_pubAddress, _count));
    }

    /**
     * @notice gets adv Id 
     * @return advId of adv
     */
    function getAdvId(
        address _advAddress,
        string memory _advTitle,
        bytes32 _advSpaceId
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_advAddress, _advTitle, _advSpaceId));
    }

    /**
     * @notice fetches all moderator addresses
     * @return array if addresses of moderators
     */
    function getModerators() public view returns (address[] memory) {
        return moderators;
    }

    /**
     * @dev internal functino to pay moderator fees 
     * @param _advId is id of adv 
     * @param _advSpaceId is id of adv space 
     * 
     * Requirements
     * - moderator should not be already paid for given adv in advspace
     */
    function _payModerator(bytes32 _advId, bytes32 _advSpaceId) internal {
        if (advIdToModeratorPaid[_advId] == address(0)) {
            advIdToModeratorPaid[_advId] = msg.sender;
            moderatorRecvdFees[msg.sender] += _advSpaces[_advSpaceId]
                .moderationFees;
            erc20TokenAddress.approve(
                address(this),
                _advSpaces[_advSpaceId].moderationFees
            );
            _tranferERC20Amount(
                address(this),
                msg.sender,
                _advSpaces[_advSpaceId].moderationFees
            );
        }
    }

    /**
     * @dev internal functino to check if adv space exists
     * throws if adv space doesn't exist 
     * @param _advSpaceId is id of adv space 
     * @return true if adv space exists
     */
    function _checkIfAdvSpaceExists(bytes32 _advSpaceId)
        internal
        view
        returns (bool)
    {
        if (bytes(_advSpaces[_advSpaceId].pageURL).length == 0)
            revert advSpaceDoesntExist({advSpaceId: _advSpaceId});
        return true;
    }

    /**
     * @dev internal functino to check if adv  exists
     * throws if adv doesn't exist 
     * @param _advId is id of adv 
     * @return true if adv exists
     */
    function _checkIfAdvertiseExists(bytes32 _advId) internal view returns (bool) {
        if (bytes(_advertises[_advId].advTitle).length == 0)
            revert advertiseDoesntExist({advId: _advId});
        return true;
    }

    /**
     * @dev internal functino to change status of adv
     * @param _advId is id of adv 
     * @param _status is Enum value from `AdvStatus`
     */
    function _setAdvStatus(bytes32 _advId, AdvStatus _status) internal {
        _checkIfAdvertiseExists(_advId);
        _advertises[_advId].advStatus = AdvStatus(_status);
        if (_status == AdvStatus(1)) {
            _setDurationForAdv(_advId);
        } else if (_status == AdvStatus(3)) {
            _updateEndDurationForAdv(_advId, true);
        }
    }

    /**
     * @dev internal functino to transfer ERC20 tokens from sender to receiver
     * @param _sender is address os sender, can by EOA or contract address
     * @param _receiver is address os receiver, can by EOA or contract address
     * @param _amount is number of ERC20 tokens to be transferred
     */
    function _tranferERC20Amount(
        address _sender,
        address _receiver,
        uint256 _amount
    ) internal {
        erc20TokenAddress.safeTransferFrom(_sender, _receiver, _amount);
    }

    /**
     * @dev internal functino to update stopTime of adv
     * @param _advId is id of adv
     * @param _isCurrTimestamp is true/false, true if stopTime should be set to current timestamp else false 
     */
    function _updateEndDurationForAdv(bytes32 _advId, bool _isCurrTimestamp)
        internal
    {
        uint256 currTimestamp = block.timestamp;
        if (_isCurrTimestamp) {
            _advDurationCycles[_advId][_advDurationCycles[_advId].length - 1]
                .stopTime = currTimestamp;
        } else {
            uint256 updatedDur = balOfAdvertiserByAdvId(_advId) /
                _advertises[_advId].paymentRatePerSec;

            _advDurationCycles[_advId][_advDurationCycles[_advId].length - 1]
                .stopTime = currTimestamp + updatedDur;
        }
    }

    /**
     * @dev internal functino to duration cycle of adv
     * @param _advId is id of adv
     */
    function _setDurationForAdv(bytes32 _advId) internal {
        uint256 currTimestamp = block.timestamp;
        uint256 currBalanceOfAdv = balOfAdvertiserByAdvId(_advId);
        uint256 stopTimestamp = currTimestamp +
            (currBalanceOfAdv / _advertises[_advId].paymentRatePerSec);
        _advDurationCycles[_advId].push(
            ActiveDuration(
                currTimestamp,
                stopTimestamp,
                _advertises[_advId].paymentRatePerSec
            )
        );
    }

    /**
     * @dev internal functino to calculate how much token balance is consumed by adv
     * @param _advId is id of adv
     * @return consumedAmt is token amount consumed by adv in wei
     */
    function _consumedByAdv(bytes32 _advId)
        internal
        view
        returns (uint256 consumedAmt)
    {
        _checkIfAdvertiseExists(_advId);
        if (
            _advDurationCycles[_advId][_advDurationCycles[_advId].length - 1]
                .startTime == 0
        ) return 0;

        uint256 duration;
        uint256 currTimestamp = block.timestamp;

        ActiveDuration[] memory _durationCycles = _advDurationCycles[_advId];
        if (
            currTimestamp <=
            _durationCycles[_durationCycles.length - 1].stopTime
        ) {
            _durationCycles[_durationCycles.length - 1].stopTime = currTimestamp;
        }
        for (uint32 i = 1; i < _durationCycles.length; i++) {
            duration =
                _durationCycles[i].stopTime -
                _durationCycles[i].startTime;
            consumedAmt =
                consumedAmt +
                (duration * _advDurationCycles[_advId][i].payRatePerSecond);
        }
    }
}