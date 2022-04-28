export const LEND_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "loanID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "externalLiquidation",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "wvtAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "stableCoinAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "initiationTime",
          "type": "uint256"
        }
      ],
      "name": "AcceptLoan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "previousAdmin",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "AdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "beacon",
          "type": "address"
        }
      ],
      "name": "BeaconUpgraded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "loanID",
          "type": "uint256"
        }
      ],
      "name": "CancelLoan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "loanID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "stableCoin",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "borrower",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "interestrate",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "ltv",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "lt",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "discount",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "externalLiquidate",
          "type": "bool"
        }
      ],
      "name": "CreateLoan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "loanID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "stableContractAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "stablePushAmount",
          "type": "uint256"
        }
      ],
      "name": "LiquidateLoan",
      "type": "event"
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "loanID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "initiationTime",
          "type": "uint256"
        }
      ],
      "name": "PullAsset",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "loanID",
          "type": "uint256"
        }
      ],
      "name": "RepayLoan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "lendnft",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "loanBook1",
      "outputs": [
        {
          "internalType": "address",
          "name": "wvtAddress",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "interestRate",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "stablecoinAddress",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "loanToValue",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "lenderAddress",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "discount",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "borrowerAddress",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "liquidationThreshold",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "loanBook2",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "initiationTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "wvtAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stablecoinAmount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "externalLiquidation",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "stageOfLoan",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "loanID",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "master",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "proxiableUUID",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
          "name": "newImplementation",
          "type": "address"
        }
      ],
      "name": "upgradeTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "upgradeToAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_master",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_stablecoinAddress",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_borrower",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint96",
          "name": "_interestRate",
          "type": "uint96"
        },
        {
          "internalType": "uint96",
          "name": "_loanToValue",
          "type": "uint96"
        },
        {
          "internalType": "uint96",
          "name": "_liquidationThreshold",
          "type": "uint96"
        },
        {
          "internalType": "uint256",
          "name": "_duration",
          "type": "uint256"
        },
        {
          "internalType": "uint96",
          "name": "_discount",
          "type": "uint96"
        },
        {
          "internalType": "bool",
          "name": "_externalLiquidate",
          "type": "bool"
        }
      ],
      "name": "createLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanID",
          "type": "uint256"
        }
      ],
      "name": "cancelLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanID",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_externalLiquidation",
          "type": "bool"
        }
      ],
      "name": "acceptLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanID",
          "type": "uint256"
        }
      ],
      "name": "pullAssets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanID",
          "type": "uint256"
        }
      ],
      "name": "repaymentLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanID",
          "type": "uint256"
        }
      ],
      "name": "liquidation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]