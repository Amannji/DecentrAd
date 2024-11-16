'use strict';

export const publisherABI = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_modAddresses",
				"type": "address[]"
			}
		],
		"name": "addModerators",
		"outputs": [],
		"stateMutability": "nonpayable", 
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address", 
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "advId",
				"type": "bytes32"
			}
		],
		"name": "advIdAlreadyExist",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "advSpaceId",
				"type": "bytes32"
			}
		],
		"name": "advSpaceDoesntExist",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "advId",
				"type": "bytes32"
			}
		],
		"name": "advertiseDoesntExist",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "advIds",
				"type": "bytes32[]"
			},
			{
				"internalType": "address",
				"name": "walletAddr",
				"type": "address"
			}
		],
		"name": "zeroBalanceForAdv",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_advertiser",
				"type": "address"
			}
		],
		"name": "AdvAddedToAdvSpace",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_approvedBy",
				"type": "address"
			}
		],
		"name": "AdvApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "AdvContentUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_prevPayRate",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_newPayRate",
				"type": "uint256"
			}
		],
		"name": "AdvPaymentUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_rejectedBy",
				"type": "address"
			}
		],
		"name": "AdvRejected",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_restartedBy",
				"type": "address"
			}
		],
		"name": "AdvRestarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_size",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "_pageURL",
				"type": "string"
			}
		],
		"name": "AdvSpaceCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bool",
				"name": "_isEnabled",
				"type": "bool"
			}
		],
		"name": "AdvSpaceStatusChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			}
		],
		"name": "AdvSpaceUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_stoppedBy",
				"type": "address"
			}
		],
		"name": "AdvStopped",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "AdvertiserWithdraw",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "approveAdv",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_siteURL",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_erc20TokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_publisher",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_platformFeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_platformFeesPercentInBPS",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_pubFactoryAddr",
				"type": "address"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "version",
				"type": "uint8"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address[]",
				"name": "_modAddress",
				"type": "address[]"
			}
		],
		"name": "ModeratorAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address[]",
				"name": "_modAddress",
				"type": "address[]"
			}
		],
		"name": "ModeratorRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32[]",
				"name": "_advIds",
				"type": "bytes32[]"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "PublisherWithdraw",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "rejectAdv",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_modAddresses",
				"type": "address[]"
			}
		],
		"name": "removeModerators",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "restartAdv",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "_isEnabled",
				"type": "bool"
			}
		],
		"name": "setAdvSpaceStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "stopAdv",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "TokensDeposited",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_advText",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_advTitle",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_ipfsHashes",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "_advLink",
				"type": "string"
			}
		],
		"name": "updateAdvContent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_paymentRatePerSec",
				"type": "uint256"
			}
		],
		"name": "updateAdvPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_size",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_pageURL",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_moderationFees",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "updateAdvSpace",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newDescription",
				"type": "string"
			}
		],
		"name": "updateDescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newSiteURL",
				"type": "string"
			}
		],
		"name": "updateSiteURL",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawAdvertiser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "_advIds",
				"type": "bytes32[]"
			}
		],
		"name": "withdrawPublisher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "advAdvertiserWithdrawnAmt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "advDepositAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "advIdToModeratorPaid",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "advPubWithdrawnAmt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "advSpaceCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "balOfAdvertiserByAdvId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "balOfPubByAdvId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "description",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "erc20TokenAddress",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "_advIds",
				"type": "bytes32[]"
			}
		],
		"name": "getAdsByIds",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "advSpaceId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "advertiser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "advTitle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "advText",
						"type": "string"
					},
					{
						"internalType": "enum IPublisher.AdvStatus",
						"name": "advStatus",
						"type": "uint8"
					},
					{
						"internalType": "string[]",
						"name": "ipfsHashes",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "paymentRatePerSec",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "advLink",
						"type": "string"
					}
				],
				"internalType": "struct Publisher.Advertise[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "getAdvDurationCycles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stopTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "payRatePerSecond",
						"type": "uint256"
					}
				],
				"internalType": "struct Publisher.ActiveDuration[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_advAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_advTitle",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			}
		],
		"name": "getAdvId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_advertiserAddr",
				"type": "address"
			}
		],
		"name": "getAdvIdsOfAdvertiser",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advSpaceId",
				"type": "bytes32"
			}
		],
		"name": "getAdvIdsOfAdvSpace",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pubAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "getAdvSpaceId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "_advSpaceIds",
				"type": "bytes32[]"
			}
		],
		"name": "getAdvSpacesByIds",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "size",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "pageURL",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "moderationFees",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isEnabled",
						"type": "bool"
					}
				],
				"internalType": "struct Publisher.AdvSpace[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAdvSpaceIds",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_advId",
				"type": "bytes32"
			}
		],
		"name": "getIfAdvIsActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getModerators",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MODERATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "moderatorRecvdFees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "moderators",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeeAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeesPercentInBPS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publisher",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "siteURL",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalAdvCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const publisherFactoryABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_advAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_publisher",
				"type": "address"
			}
		],
		"name": "assignContractToAdvertiser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_modAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_publisher",
				"type": "address"
			}
		],
		"name": "assignPubContractToModerator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_siteURL",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_erc20TokenAddress",
				"type": "address"
			}
		],
		"name": "createPublisherClone",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_implementation",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_platformFeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_platformFeesPercentInBPS",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "publisherAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "cloneAddress",
				"type": "address"
			}
		],
		"name": "PubCloneContractExists",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_modAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_publisher",
				"type": "address"
			}
		],
		"name": "removePubContractOfModerator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_percentInBPS",
				"type": "uint256"
			}
		],
		"name": "setPlatforFeesPercentInBPS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_feeAddress",
				"type": "address"
			}
		],
		"name": "setPlatformFeeAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_implementation",
				"type": "address"
			}
		],
		"name": "upgradeImplementationContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allPublisherClones",
		"outputs": [
			{
				"internalType": "string",
				"name": "siteURL",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "cloneAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pubWalletAddress",
				"type": "address"
			}
		],
		"name": "getAllPubClonesByAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "siteURL",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "cloneAddress",
						"type": "address"
					}
				],
				"internalType": "struct PublisherFactory.PublisherClone[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPublisherContracts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "siteURL",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "cloneAddress",
						"type": "address"
					}
				],
				"internalType": "struct PublisherFactory.PublisherClone[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pubWalletAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_cloneAddress",
				"type": "address"
			}
		],
		"name": "getClone",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "siteURL",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "cloneAddress",
						"type": "address"
					}
				],
				"internalType": "struct PublisherFactory.PublisherClone",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_advAddress",
				"type": "address"
			}
		],
		"name": "getCloneContractsOfAdvertiser",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPubContractCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pubWalletAddress",
				"type": "address"
			}
		],
		"name": "getPubContractCountByAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_modAddress",
				"type": "address"
			}
		],
		"name": "getPubContractsOfModerator",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "implementation",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isAddedToAdvertiserContracts",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isAddedToModeratorContracts",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "moderatorAccContractsPointer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeeAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeesPercentInBPS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "publisherClones",
		"outputs": [
			{
				"internalType": "string",
				"name": "siteURL",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "cloneAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
