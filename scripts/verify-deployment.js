#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 ChainBallot Deployment Verification');
console.log('=====================================\n');

// Check if deployment-info.json exists and has valid data
const deploymentPath = path.join(__dirname, '../deployment-info.json');
if (fs.existsSync(deploymentPath)) {
  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));

  console.log('✅ Deployment Info Found:');
  console.log(`   📅 Last Deployment: ${deploymentInfo.lastDeployment}`);
  console.log(`   🌐 Network: ${deploymentInfo.network}`);
  console.log(`   ⛓️  Chain ID: ${deploymentInfo.chainId}`);

  if (deploymentInfo.contracts) {
    Object.entries(deploymentInfo.contracts).forEach(([name, contract]) => {
      console.log(`   📄 ${name}:`);
      console.log(`      Address: ${contract.address}`);
      console.log(`      Deployed: ${contract.deployed ? '✅' : '❌'}`);
    });
  }
  console.log('');
} else {
  console.log('❌ deployment-info.json not found. Please deploy contracts first.\n');
}

// Check if frontend files have correct contract addresses
const homeJsPath = path.join(__dirname, '../frontend/home.js');
if (fs.existsSync(homeJsPath)) {
  const homeJsContent = fs.readFileSync(homeJsPath, 'utf8');

  const votingAddressMatch = homeJsContent.match(/voting: "([^"]+)"/);
  const nftAddressMatch = homeJsContent.match(/nft: "([^"]+)"/);

  if (votingAddressMatch && nftAddressMatch) {
    console.log('✅ Frontend Contract Addresses:');
    console.log(`   🗳️  Voting Contract: ${votingAddressMatch[1]}`);
    console.log(`   🎫 NFT Contract: ${nftAddressMatch[1]}`);

    // Check if addresses match deployment info
    if (fs.existsSync(deploymentPath)) {
      const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
      const expectedVoting = deploymentInfo.contracts?.ChainBallot?.address;
      const expectedNFT = deploymentInfo.contracts?.VotingPowerNFT?.address;

      if (expectedVoting && expectedNFT) {
        const votingMatch = votingAddressMatch[1] === expectedVoting;
        const nftMatch = nftAddressMatch[1] === expectedNFT;

        console.log('\n🔗 Address Verification:');
        console.log(`   Voting Contract: ${votingMatch ? '✅ Match' : '❌ Mismatch'}`);
        console.log(`   NFT Contract: ${nftMatch ? '✅ Match' : '❌ Mismatch'}`);
      }
    }
    console.log('');
  } else {
    console.log('❌ Frontend contract addresses not found or malformed.\n');
  }
}

// Check Vercel configuration
const vercelPath = path.join(__dirname, '../vercel.json');
const frontendVercelPath = path.join(__dirname, '../frontend/vercel.json');

if (fs.existsSync(vercelPath) || fs.existsSync(frontendVercelPath)) {
  console.log('✅ Vercel Configuration Found');
  const configPath = fs.existsSync(frontendVercelPath) ? frontendVercelPath : vercelPath;
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  if (config.rewrites && config.rewrites.some(r => r.source === '/' && r.destination.includes('Launch_page.html'))) {
    console.log('   📄 Default route configured correctly');
  }
  console.log('');
}

// Check if all required frontend files exist
const requiredFiles = [
  'home.html',
  'home.js',
  'main.css',
  'create-voting.html',
  'create-voting.js',
  'vote.html',
  'vote.js',
  'result.html',
  'result.js',
  'profile.html',
  'profile.js'
];

console.log('📁 Frontend Files Check:');
let missingFiles = [];
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '../frontend', file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file}`);
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log(`\n❌ Missing ${missingFiles.length} files. Please check your frontend directory.`);
} else {
  console.log('\n✅ All required frontend files present');
}

// Final deployment checklist
console.log('\n📋 Deployment Checklist:');
console.log('   □ Smart contracts deployed to GAI Network');
console.log('   □ Contract addresses updated in frontend files');
console.log('   □ Vercel account connected and configured');
console.log('   □ GAI Network added to MetaMask');
console.log('   □ Test deployment with vercel --prod');

console.log('\n🚀 Ready for Deployment!');
console.log('   Run: ./scripts/deploy-to-vercel.sh');

if (missingFiles.length > 0 || !fs.existsSync(deploymentPath)) {
  console.log('\n⚠️  Please resolve the issues above before deploying.');
  process.exit(1);
}
