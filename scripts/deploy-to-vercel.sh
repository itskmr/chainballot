#!/bin/bash

echo "🚀 ChainBallot Vercel Deployment Script"
echo "======================================"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Please login to Vercel first:"
    echo "   vercel login"
    exit 1
fi

echo "✅ Vercel authentication confirmed"

# Navigate to frontend directory for deployment
cd frontend

echo "📦 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo "📝 Your ChainBallot application is now live on Vercel"
    echo ""
    echo "🔗 Next steps:"
    echo "   1. Connect your wallet to the deployed application"
    echo "   2. Ensure you're on the GAI Network in MetaMask"
    echo "   3. Test voting functionality with deployed contracts"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   - Make sure contract addresses are correctly configured"
    echo "   - Verify GAI Network RPC endpoints are accessible"
    echo "   - Check that MetaMask can connect to GAI Network"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
