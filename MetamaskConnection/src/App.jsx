import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {ethers} from 'ethers'

function App() {
  const [count, setCount] = useState(0)
  const [connected, setConnected]= useState(false)
  const [id, setId]= useState(null)
  const connect= async()=>{
      try{

        if(!connected){

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const displayAddress= address?.substr(0,6)+"....";
          const message= " Hello World..."
          const sig= await signer.signMessage(message);
          ethers.verifyMessage(message, sig);
          setId(displayAddress);
          setConnected(true);

        }
        else{

          window.ethereum.selectedAddress = null;
          setConnected(false);
        }

      }
      catch(error){

        console.log("Something gone wrong ..", error.message)

      }
  }


  const wallet_to_contract= async()=>{
    const Wallet_provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await Wallet_provider.getSigner();
    const ContractAddress= "0xaF3f7b0F1Bb73F0ac3D7016936861dD51A89a7b9";
    const Node_provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/6a7dccd5a58e49fb9e4084614b77aa18`);
    const ContractABI =[
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

    const ContractInstance = new ethers.Contract(ContractAddress,ContractABI, signer);
    const tx = await ContractInstance.sendEthContract({value:ethers.parseUnits("0.1","ether")});
    const TxResponse = await Node_provider.sendTransaction(tx);
    console.log(" Eth sent: ", TxResponse);
  }


  const contract_to_wallet= async()=>{
    const Wallet_provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await Wallet_provider.getSigner();
    const ContractAddress= "0xaF3f7b0F1Bb73F0ac3D7016936861dD51A89a7b9";
    const Node_provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/6a7dccd5a58e49fb9e4084614b77aa18`);
    const ContractABI =[
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

    const ContractInstance = new ethers.Contract(ContractAddress,ContractABI, signer);
    const tx = await ContractInstance.sendEthUser("0xb2a77c0df0772Fa79AE90eAB8a9Bc69748AdB9aB",{value:ethers.parseUnits("0.01","ether")});
    const TxResponse = await Node_provider.sendTransaction(tx);
    console.log(" Eth sent: ", TxResponse);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    <hr/>
    <div className='parent'>
      <nav className='glass'>
        <a href='./'>Home</a>
        <a href='./'>About</a>
        <a href='./'>COntact</a>
      </nav>
      <section className='glass'>
        <button onClick={connect}>
          {connected ?id:"CONNECT"}
        </button> 
      <h3>Send Ether from Meta-Mask to Smart Contract:</h3> 
        <button onClick={wallet_to_contract} >Transfer</button>
      <h3>Send Ether from Contract to MetaMask:</h3>
        <button onClick={contract_to_wallet}>Receive</button>
      </section>

    </div>

    </>
  )
}

export default App
