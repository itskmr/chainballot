# 🚀 ChainBallot - Decentralized Voting Platform

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fchainballot)

## 📋 Table of Contents
- [🏗️ Architecture Overview](#architecture-overview)
- [🌐 Live Demo](#live-demo)
- [🚀 Quick Deploy to Vercel](#quick-deploy-to-vercel)
- [📦 Manual Deployment](#manual-deployment)
- [⚙️ Prerequisites](#prerequisites)
- [🔧 Smart Contracts](#smart-contracts)
- [💻 Frontend Stack](#frontend-stack)
- [🌍 Blockchain Integration](#blockchain-integration)
- [🔐 Wallet Setup](#wallet-setup)
- [🧪 Testing](#testing)
- [📚 API Reference](#api-reference)
- [🔧 Troubleshooting](#troubleshooting)

## 🏗️ Architecture Overview

**ChainBallot** is a decentralized voting platform built on blockchain technology that combines:

### 🏛️ Smart Contracts (Backend)
- **ChainBallot.sol**: Main voting contract managing elections, candidates, and votes
- **VotingPowerNFT.sol**: ERC721 NFT contract for voting eligibility

### 💻 Frontend (Web Interface)
- **Static HTML/CSS/JavaScript** - No build process required
- **Web3.js** for blockchain interaction
- **MetaMask** wallet integration
- **Responsive design** with modern UI

### ⛓️ Blockchain Network
- **GAI Network** (Chain ID: 1313161894)
- **RPC**: `https://0x4e4542a6.rpc.aurora-cloud.dev`
- **Explorer**: `https://0x4e4542a6.explorer.aurora-cloud.dev`

## 🌐 Live Demo

Your deployed application will be accessible at: `https://your-project-name.vercel.app`

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy
1. Click the **"Deploy to Vercel"** button above
2. Connect your GitHub repository
3. Vercel will automatically deploy your app
4. Your app will be live instantly!

### Option 2: Manual Deploy (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from the frontend directory
cd frontend
vercel --prod

# 4. Follow the prompts and your app will be deployed!
```

## 📦 Manual Deployment

### Step 1: Environment Setup
```bash
# Clone and navigate to project
git clone <your-repo-url>
cd chainballot

# Install dependencies
yarn install

# Deploy smart contracts (if not already deployed)
yarn deploy
```

### Step 2: Update Contract Addresses
If you redeploy contracts, update the addresses in the frontend:
```bash
# Update contract addresses in frontend files
node scripts/update-addresses.js <NFT_ADDRESS> <VOTING_ADDRESS>
```

### Step 3: Deploy to Vercel
```bash
# Deploy to Vercel
./scripts/deploy-to-vercel.sh
```

## ⚙️ Prerequisites

### Required Software
- **Node.js** (v16 or higher)
- **Yarn** package manager
- **MetaMask** browser extension
- **Vercel CLI** (`npm i -g vercel`)

### Blockchain Wallet Setup
1. Install **MetaMask** browser extension
2. Add **GAI Network** to MetaMask:
   - Network Name: `Gyansetu AI`
   - RPC URL: `https://0x4e4542a6.rpc.aurora-cloud.dev`
   - Chain ID: `1313161894`
   - Currency Symbol: `GAI`
   - Block Explorer: `https://0x4e4542a6.explorer.aurora-cloud.dev`

## 🔧 Smart Contracts

### ChainBallot Contract (`0x9a836494aCB32fb1721eCbe976C13291dd91597f`)
**Features:**
- ✅ Create voting sessions with multiple candidates
- ✅ Time-locked voting periods
- ✅ NFT-based voting eligibility
- ✅ Real-time vote counting
- ✅ Vote integrity (one vote per NFT holder)

### VotingPowerNFT Contract (`0xb22d24BE5d608e5BD33d2b5D936A80b74d445CCd`)
**Features:**
- ✅ ERC721 compliant NFT minting
- ✅ Batch minting capabilities
- ✅ Voting power verification
- ✅ Ownership tracking

## 💻 Frontend Stack

### Technology Stack
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - No frameworks, pure JS
- **Web3.js** - Blockchain interaction
- **Font Awesome** - Icons and UI elements

### Key Features
- **Responsive Design** - Works on all devices
- **Real-time Updates** - Live voting data
- **Wallet Integration** - MetaMask connectivity
- **Network Switching** - Auto-detects and prompts for GAI Network
- **Error Handling** - Comprehensive error messages and recovery

## 🌍 Blockchain Integration

### Network Configuration
```javascript
const GAI_NETWORK = {
  chainId: '0x4E4542A6',
  chainName: 'Gyansetu AI',
  nativeCurrency: {
    name: 'Gyansetu AI',
    symbol: 'GAI',
    decimals: 18,
  },
  rpcUrls: ['https://0x4e4542a6.rpc.aurora-cloud.dev'],
  blockExplorerUrls: ['https://0x4e4542a6.explorer.aurora-cloud.dev'],
};
```

### Contract Interaction
- **Read Operations**: Use public RPC for viewing data
- **Write Operations**: Require MetaMask connection and transaction signing
- **Gas Optimization**: Contracts use optimized Solidity code

## 🔐 Wallet Setup

### For Users
1. Install MetaMask browser extension
2. Create or import a wallet
3. Add GAI Network (see Prerequisites)
4. Connect to the application via "Connect Wallet" button

### For Administrators
1. Deploy contracts using Hardhat
2. Mint NFTs for voters using `mintNFT()` or `batchMintNFTs()`
3. Create voting sessions with initial candidates

## 🧪 Testing

### Smart Contract Tests
```bash
# Compile contracts
yarn compile

# Run tests
yarn test

# Deploy to local network for testing
yarn deploy:local
```

### Frontend Testing
1. Open the application in browser
2. Connect MetaMask wallet
3. Ensure you're on GAI Network
4. Test voting functionality with deployed contracts

## 📚 API Reference

### Contract Methods

#### ChainBallot Contract
- `createVoting(identifier, title, description, startTime, endTime, nftContract, candidates[])`
- `vote(identifier, candidate)`
- `addCandidate(identifier, candidate)`
- `getVotingData(identifier)` → `candidates[], votesCount[]`
- `getOngoingVotings()` → `string[]`

#### VotingPowerNFT Contract
- `mintNFT(recipient)`
- `batchMintNFTs(recipients[])`
- `balanceOf(owner)` → `uint256`
- `hasReceived(address)` → `bool`

## 🔧 Troubleshooting

### Common Issues

**❌ "Smart Contracts Not Yet Deployed"**
```bash
# Deploy contracts first
yarn deploy

# Update frontend with new addresses
node scripts/update-addresses.js <NFT_ADDRESS> <VOTING_ADDRESS>
```

**❌ MetaMask Network Issues**
1. Ensure GAI Network is added to MetaMask
2. Check RPC URL is accessible
3. Verify Chain ID is correct (1313161894)

**❌ Transaction Failures**
1. Check gas price and limits
2. Ensure sufficient GAI tokens for gas
3. Verify contract addresses are correct

**❌ Vercel Deployment Issues**
```bash
# Check deployment logs
vercel logs --follow

# Redeploy if needed
vercel --prod
```

### Getting Help

1. **Check the logs**: `vercel logs --follow`
2. **Verify contract deployment**: Check deployment-info.json
3. **Test locally**: `yarn start` then open http://localhost:3000
4. **Check network**: Ensure you're on GAI Network in MetaMask

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: roizlive69@gmail.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/chainballot/issues)

---

**Made with ❤️ for decentralized democracy**
- **User-Friendly Interface**: Modern web interface accessible to all users
- **Immutable Records**: Tamper-proof voting records on the blockchain
- **Smart Contract Automation**: Automated voting processes with Solidity contracts

## 🛠️ Tech Stack

- **Blockchain**: Gyansetu AI (GAI) Network
- **Smart Contracts**: Solidity with OpenZeppelin standards
- **Frontend**: HTML5, CSS3, JavaScript (Web3.js)
- **Development**: Hardhat development framework
- **Wallet**: MetaMask integration

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
2. **MetaMask** browser extension
3. **Git** for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chainballot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your private key:
   ```env
   PRIVATE_KEY=your_private_key_without_0x_prefix
   ```

4. **Configure GAI Network in MetaMask**
   - Open MetaMask
   - Click "Add Network"
   - Enter the following details:
     - Network Name: `Gyansetu AI`
     - New RPC URL: `https://0x4e4542a6.rpc.aurora-cloud.dev`
     - Chain ID: `1313161894`
     - Currency Symbol: `GAI`
     - Block Explorer URL: `https://0x4e4542a6.explorer.aurora-cloud.dev`

### Deploy Smart Contracts

1. **Compile contracts**
   ```bash
   npx hardhat compile
   ```

2. **Deploy to GAI Network**
   ```bash
   npx hardhat run scripts/deploy.js --network gai
   ```

3. **Update frontend contract addresses**
   After deployment, the script will output contract addresses. Update them in:
   - `frontend/home.js` - `CONTRACT_ADDRESSES` object
   - `deployment-info.json` file

### Run the Application

1. **Start a local server** (choose one option):

   **Option A: Using Node.js http-server**
   ```bash
   npx http-server frontend -p 3000
   ```

   **Option B: Using Python (if installed)**
   ```bash
   cd frontend && python -m http.server 3000
   ```

   **Option C: Using Live Server (VS Code extension)**
   - Install Live Server extension in VS Code
   - Right-click on `frontend/home.html` → "Open with Live Server"

2. **Open in browser**
   Navigate to `http://localhost:3000/home.html`

3. **Connect your wallet**
   - Click "Connect Wallet" button
   - MetaMask will prompt to connect to GAI Network
   - Approve the connection

## 📖 Usage Guide

### For Voters

1. **Connect Wallet**: Click "Connect Wallet" and select MetaMask
2. **Verify Network**: Ensure you're connected to GAI Network
3. **Browse Votings**: View all ongoing and completed votings
4. **Vote**: Click "Vote Now" on active votings (must own required NFT)
5. **View Results**: Check results after voting period ends

### For Administrators

1. **Create Voting**: Go to "Create Voting" page
2. **Set Parameters**:
   - Voting title and description
   - Start and end times
   - Required NFT contract address
   - Candidate list
3. **Deploy**: The voting will be created on-chain
4. **Manage**: Add/remove candidates, monitor voting progress

### NFT Management

1. **Mint Voting NFTs**: Use the NFT contract to mint eligibility tokens
2. **Distribute**: Send NFTs to eligible voters
3. **Verify**: Voters must hold the specified NFT to participate

## 🔧 Development

### Project Structure

```
ChainBallot/
├── contracts/           # Smart contracts
│   ├── ChainBallot.sol  # Main voting contract
│   └── VotingPowerNFT.sol # NFT contract
├── frontend/           # Web interface
│   ├── home.html       # Main dashboard
│   ├── vote.html       # Voting interface
│   ├── create-voting.html # Admin panel
│   └── *.js           # JavaScript files
├── scripts/           # Deployment scripts
├── test/             # Test files
└── hardhat.config.js # Hardhat configuration
```

### Available Scripts

- `npm run compile` - Compile smart contracts
- `npm run deploy` - Deploy to GAI network
- `npm run deploy:local` - Deploy to local network
- `npm run test` - Run tests
- `npm run node` - Start local Hardhat node
- `npm run console` - Open Hardhat console

### Network Configuration

The application is configured for **Gyansetu AI Network**:
- **Chain ID**: 1313161894
- **RPC URL**: https://0x4e4542a6.rpc.aurora-cloud.dev
- **Explorer**: https://0x4e4542a6.explorer.aurora-cloud.dev
- **Currency**: GAI

## 🔒 Security Features

- **NFT Verification**: Prevents unauthorized voting
- **Double-vote Protection**: Smart contracts prevent multiple votes
- **Time-locked Voting**: Enforced start/end times
- **Immutable Records**: Blockchain ensures tamper-proof results
- **Privacy Protection**: Voter identities remain anonymous

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Updates

- Smart contracts use Solidity 0.8.20
- Compatible with MetaMask and other Web3 wallets
- Regular updates for security and features

---

**Happy Voting on the GAI Network! 🗳️⚡**
