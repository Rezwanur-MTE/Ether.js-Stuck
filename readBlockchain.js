const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/6a7dccd5a58e49fb9e4084614b77aa18"
);

const queryBlockchain = async () => {
  try {
    const block = await provider.getBlockNumber();
    console.log("Current block number:", block);

    const balance = await provider.getBalance("0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326");
     console.log(" Balance of address: ", balance);

   const balanceEth= ethers.formatEther(balance);
   console.log(" Balance of address in Eth: ", balanceEth);

  } catch (error) {
    console.error("Error querying blockchain:", error);
  }
};

queryBlockchain();