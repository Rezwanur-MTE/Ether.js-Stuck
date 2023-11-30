//0xaf3f7b0f1bb73f0ac3d7016936861dd51a89a7b9

const {ethers}= require("ethers");

const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/6a7dccd5a58e49fb9e4084614b77aa18");

const WalletAddress = "0xaf3f7b0f1bb73f0ac3d7016936861dd51a89a7b9";
const WalletABI= [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "accountBalance",
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
		"name": "contractBalance",
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
		"name": "getValue",
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
		"name": "name",
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
		"name": "sendEthContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "sendEthUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contractInteraction= async()=>{
    const walletcontract = new ethers.Contract(WalletAddress, WalletABI, provider);
    const contractName = await walletcontract.name();
    console.log("Contract name is : ",contractName);

    const num = await walletcontract.getValue();
    console.log("Number value: ", num);

    const contractBalance= await walletcontract.contractBalance();
    console.log(" Contract balance is ", ethers.formatEther(contractBalance));

    const userBalance = await walletcontract.accountBalance("0xb2a77c0df0772Fa79AE90eAB8a9Bc69748AdB9aB");
    console.log("User Balance is : ", ethers.formatEther(userBalance));



}

contractInteraction();