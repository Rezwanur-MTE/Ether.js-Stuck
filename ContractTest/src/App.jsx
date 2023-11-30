import { useState } from 'react'

import { ethers } from 'ethers'

//import { useEffect } from 'react'
//const { ethers}= require("ethers");

function App() {
 
  const [connected, setConnected] = useState(false)
  const[id, setId]= useState(null)

  const connect = async()=>{

    try{

      if(!connected){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer= await provider.getSigner();
        const address = await signer.getAddress();
        const displayAddress= address?. substr(0,6) + "..."
        const message = " Hello World"
        const sig= await signer.signMessage(message)
        ethers.verifyMessage(message, sig);
        setId(displayAddress)
        setConnected(true)
      }
      else{
        window.ethereum.selectedAddress = null
        setConnected(false)
      }

    }
  catch(error){
    console.log(error.message)
  }

 /* const WalletAddress = "0xaf3f7b0f1bb73f0ac3d7016936861dd51a89a7b9";

  
  useEffect(()=>{


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


    console.log("Using Effect");
    const writeContract= async()=>{
       
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts",[]);
      const signer = await provider.getSigner();
      console.log("Account:", await signer.getAddress());
      const contract = new ethers.Contract(WalletAddress,WalletABI,signer);
      await contract.setValue(2);
    }

    writeContract()
  
  }, []); 
  */

  return (
    <div>
      <h1>Interacting with Smart Contract</h1>
      <nav className='glass'>
        <a href="./">Home</a>
        <a href="./"> About</a>
        <a hraf="./"> Contract </a>
      </nav>
     
     <section className='glass'>
      <button onclick={connect}> 
      
      {connected? id: "CONNECT"}

      </button>
     </section>


    </div>
  );
}
}

export default App
