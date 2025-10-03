# 🚀 ChainBallot - Complete Startup Guide

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v16+) - Check: `node -v`
- **Yarn** - Check: `yarn -v`
- **MetaMask** browser extension
- **Git** (for cloning if needed)

## 🎯 Quick Start (5 Steps)

### Step 1: Install Dependencies
```bash
cd ~/challenge-simple-nft-example/ChainBallot
yarn install
```

### Step 2: Configure MetaMask
1. Open MetaMask
2. Click "Add Network"
3. Enter these details:
   ```
   Network Name: Gyansetu AI
   RPC URL: https://0x4e4542a6.rpc.aurora-cloud.dev
   Chain ID: 1313161894
   Currency Symbol: GAI
   Block Explorer: https://0x4e4542a6.explorer.aurora-cloud.dev
   ```

### Step 3: Set Up Environment
```bash
# Edit .env file
nano .env

# Add your private key (without 0x)
PRIVATE_KEY=your_private_key_here
```

### Step 4: Deploy Contracts
```bash
# Compile contracts
yarn compile

# Deploy to GAI network
yarn deploy
```

### Step 5: Update Addresses & Run
```bash
# After deployment, copy addresses and run:
node scripts/update-addresses.js <NFT_ADDRESS> <VOTING_ADDRESS>

# Start the application
yarn start

# Open: http://localhost:3000/home.html
```

## 🔧 Detailed Setup

### 1. Project Structure
```
ChainBallot/
├── contracts/          # Smart contracts
├── frontend/           # Web interface
├── scripts/           # Deployment scripts
├── test/              # Tests
└── hardhat.config.js  # Hardhat configuration
```

### 2. MetaMask Network Setup
**Manual Setup** (if auto-setup fails):
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Fill in:
   - **Network Name**: `Gyansetu AI`
   - **New RPC URL**: `https://0x4e4542a6.rpc.aurora-cloud.dev`
   - **Chain ID**: `1313161894`
   - **Currency Symbol**: `GAI`
   - **Block Explorer URL**: `https://0x4e4542a6.explorer.aurora-cloud.dev`

### 3. Environment Configuration
Create/edit `.env` file:
```bash
# Your private key without 0x prefix
PRIVATE_KEY=1234567890abcdef...

# Optional: Etherscan API key for verification
ETHERSCAN_API_KEY=your_api_key_here
```

### 4. Smart Contract Deployment
```bash
# 1. Compile contracts
yarn compile

# 2. Deploy to GAI network
yarn deploy

# 3. Copy the output addresses:
# VotingPowerNFT: 0x...
# ChainBallot: 0x...

# 4. Update frontend
node scripts/update-addresses.js 0x_NFT_ADDRESS 0x_VOTING_ADDRESS
```

### 5. Running the Application
```bash
# Start web server
yarn start

# Alternative
python3 -m http.server 3000
```

Visit: `http://localhost:3000/home.html`

## 🎮 Usage Guide

### For Voters:
1. Click "Connect Wallet" → Select MetaMask
2. Approve GAI Network connection
3. Browse ongoing votings
4. Click "Vote Now" (must own required NFT)
5. View results after voting ends

### For Administrators:
1. Go to "Create Voting" page
2. Connect wallet to GAI Network
3. Set voting parameters (title, candidates, NFT contract)
4. Deploy voting on-chain

## 🛠️ Available Commands

```bash
# Development
yarn compile       # Compile smart contracts
yarn deploy        # Deploy to GAI network
yarn deploy:local  # Deploy to localhost
yarn test          # Run tests
yarn node          # Start local Hardhat node

# Application
yarn start         # Start web server
yarn serve         # Alternative server start

# Utilities
./setup.sh         # Run setup script
node scripts/update-addresses.js <NFT> <VOTING>  # Update contract addresses
```

## 🔍 Troubleshooting

### Issue: Endless `yarn install` loop
**Solution**: The dependencies are now fixed. Run:
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Issue: "Contracts not deployed" message
**Solution**:
1. Run `yarn deploy` first
2. Update addresses: `node scripts/update-addresses.js <NFT> <VOTING>`
3. Refresh the page

### Issue: MetaMask shows Ethereum instead of GAI
**Solution**:
1. Click MetaMask network dropdown
2. Select "Gyansetu AI" network
3. Or click "Connect Wallet" again - it will auto-switch

### Issue: Deployment fails
**Solution**:
1. Check `.env` has correct `PRIVATE_KEY`
2. Ensure MetaMask is on GAI Network
3. Make sure you have GAI tokens for gas

### Issue: 404 favicon error
**Solution**: Ignore this - it's just a missing favicon file, doesn't affect functionality.

## 🌟 Features

- ✅ **MetaMask Integration** - Seamless GAI Network connection
- ✅ **NFT-based Voting** - Only eligible voters can participate
- ✅ **Real-time Updates** - Live voting status and results
- ✅ **Responsive UI** - Works on desktop and mobile
- ✅ **Security** - Double-vote prevention, immutable records

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review the console for error messages
3. Ensure all prerequisites are installed
4. Check MetaMask network configuration

---

**🎉 Happy Voting on GAI Network!**

Your ChainBallot application is now ready to use! 🚀
