const { ethers } = require("hardhat");

async function main() {
  console.log("Starting ChainBallot deployment to GAI network...");

  // Get the ContractFactory and Signers here
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy VotingPowerNFT contract
  console.log("Deploying VotingPowerNFT contract...");
  const VotingPowerNFT = await ethers.getContractFactory("VotingPowerNFT");
  const nftContract = await VotingPowerNFT.deploy("Voting Power NFT", "VPNFT");
  await nftContract.waitForDeployment();

  const nftAddress = await nftContract.getAddress();
  console.log("VotingPowerNFT deployed to:", nftAddress);

  // Deploy ChainBallot contract
  console.log("Deploying ChainBallot contract...");
  const ChainBallot = await ethers.getContractFactory("ChainBallot");
  const ballotContract = await ChainBallot.deploy();
  await ballotContract.waitForDeployment();

  const ballotAddress = await ballotContract.getAddress();
  console.log("ChainBallot deployed to:", ballotAddress);

  // Mint some NFTs for testing
  console.log("Minting test NFTs...");
  await nftContract.mintNFT(deployer.address);
  console.log("Minted NFT to deployer");

  // Save deployment info
  const deploymentInfo = {
    network: "GAI Network",
    chainId: 1313161894,
    nftContract: nftAddress,
    ballotContract: ballotAddress,
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  console.log("\n=== Deployment Summary ===");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  console.log("\nDeployment completed successfully!");

  return {
    nftContract,
    ballotContract,
    deploymentInfo
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
