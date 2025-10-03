# ChainBallot - Decentralized Voting Platform on GAI Network

ChainBallot is a decentralized voting platform that leverages the **Gyansetu AI (GAI) Network** for secure, transparent, and tamper-proof elections. Built with modern blockchain technology, it ensures voter eligibility through NFT-based verification while maintaining complete privacy and preventing double voting.

## 🌟 Key Features

- **NFT-Based Voter Verification**: Only NFT holders can participate in voting
- **GAI Network Integration**: Built on the Gyansetu AI blockchain for enhanced security
- **Real-time Vote Tallying**: Immediate results with cryptographic privacy protection
- **MetaMask Wallet Integration**: Seamless wallet connection for GAI network
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
