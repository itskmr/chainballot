#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function updateContractAddresses(nftAddress, votingAddress) {
  console.log('🔄 Updating contract addresses in frontend files...');

  // Update home.js
  const homeJsPath = path.join(__dirname, '../frontend/home.js');
  let homeJsContent = fs.readFileSync(homeJsPath, 'utf8');

  homeJsContent = homeJsContent.replace(
    /voting: "0x0000000000000000000000000000000000000000"/,
    `voting: "${votingAddress}"`
  );

  homeJsContent = homeJsContent.replace(
    /nft: "0x0000000000000000000000000000000000000000"/,
    `nft: "${nftAddress}"`
  );

  fs.writeFileSync(homeJsPath, homeJsContent);
  console.log('✅ Updated frontend/home.js');

  // Update deployment-info.json
  const deploymentInfoPath = path.join(__dirname, '../deployment-info.json');
  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentInfoPath, 'utf8'));

  deploymentInfo.contracts.VotingPowerNFT.address = nftAddress;
  deploymentInfo.contracts.VotingPowerNFT.deployed = true;
  deploymentInfo.contracts.ChainBallot.address = votingAddress;
  deploymentInfo.contracts.ChainBallot.deployed = true;
  deploymentInfo.lastDeployment = new Date().toISOString();

  fs.writeFileSync(deploymentInfoPath, JSON.stringify(deploymentInfo, null, 2));
  console.log('✅ Updated deployment-info.json');

  // Update other JavaScript files if they exist
  const jsFiles = ['vote.js', 'create-voting.js', 'create-nft.js', 'vote-edit.js'];

  jsFiles.forEach(file => {
    const filePath = path.join(__dirname, '../frontend', file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Update voting contract address
      if (content.includes('VotingAddress')) {
        content = content.replace(
          /const VotingAddress = ".*?";/,
          `const VotingAddress = "${votingAddress}";`
        );
      }

      // Update NFT contract address if present
      if (content.includes('NFTAddress') || content.includes('nftContract')) {
        content = content.replace(
          /const NFTAddress = ".*?";/,
          `const NFTAddress = "${nftAddress}";`
        );
      }

      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated frontend/${file}`);
    }
  });

  console.log('\n🎉 Contract addresses updated successfully!');
  console.log(`📄 Voting Contract: ${votingAddress}`);
  console.log(`🖼️  NFT Contract: ${nftAddress}`);
  console.log('\nYou can now run the application and it will connect to the deployed contracts.');
}

// Get addresses from command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node scripts/update-addresses.js <NFT_CONTRACT_ADDRESS> <VOTING_CONTRACT_ADDRESS>');
  console.log('\nExample:');
  console.log('node scripts/update-addresses.js 0x123... 0x456...');
  process.exit(1);
}

const [nftAddress, votingAddress] = args;
updateContractAddresses(nftAddress, votingAddress);
