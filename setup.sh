#!/bin/bash

echo "🚀 ChainBallot Setup Script for WSL/Linux"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node -v)"

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Please install Yarn first."
    echo "   Run: npm install -g yarn"
    exit 1
fi

echo "✅ Yarn is installed: $(yarn -v)"

# Navigate to project directory
cd "$(dirname "$0")"

# Install dependencies
echo ""
echo "📦 Installing dependencies with Yarn..."
yarn install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "🔐 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and add your PRIVATE_KEY"
    echo "   PRIVATE_KEY=your_private_key_without_0x_prefix"
    echo ""
else
    echo ""
    echo "✅ .env file already exists"
fi

# Make scripts executable
chmod +x scripts/*.js

echo ""
echo "🎯 Setup Complete!"
echo ""
echo "📋 NEXT STEPS:"
echo "=============="
echo ""
echo "1️⃣  SETUP METAMASK:"
echo "   Open MetaMask → Add Network:"
echo "   • Network Name: Gyansetu AI"
echo "   • RPC URL: https://0x4e4542a6.rpc.aurora-cloud.dev"
echo "   • Chain ID: 1313161894"
echo "   • Currency Symbol: GAI"
echo "   • Block Explorer: https://0x4e4542a6.explorer.aurora-cloud.dev"
echo ""
echo "2️⃣  EDIT ENVIRONMENT FILE:"
echo "   Edit .env file and add your PRIVATE_KEY"
echo ""
echo "3️⃣  DEPLOY SMART CONTRACTS:"
echo "   yarn compile"
echo "   yarn deploy"
echo ""
echo "4️⃣  UPDATE CONTRACT ADDRESSES:"
echo "   After deployment, copy the contract addresses"
echo "   Then run: node scripts/update-addresses.js <NFT_ADDRESS> <VOTING_ADDRESS>"
echo ""
echo "5️⃣  RUN THE APPLICATION:"
echo "   yarn start"
echo "   Open: http://localhost:3000/home.html"
echo ""
echo "🛠️  USEFUL COMMANDS:"
echo "==================="
echo "• yarn install       - Install dependencies"
echo "• yarn compile       - Compile smart contracts"
echo "• yarn deploy        - Deploy to GAI network"
echo "• yarn deploy:local  - Deploy to localhost"
echo "• yarn test          - Run tests"
echo "• yarn node          - Start local Hardhat node"
echo "• yarn console       - Open Hardhat console"
echo "• yarn start         - Start the web server"
echo ""
echo "Happy voting on GAI Network! 🗳️⚡"
