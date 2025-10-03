# ChainBallot Setup Guide

## Quick Fix Summary

I've fixed the major issues in your ChainBallot project:

### ✅ Fixed Issues:
1. **Yarn install infinite loop** - Deleted corrupted yarn.lock
2. **Missing OpenZeppelin contracts** - Added to package.json dependencies
3. **Frontend ABI mismatch** - Updated to use correct contract ABIs
4. **Function name errors** - Fixed `createNFTContract` → `mintNFT` references

## Step-by-Step Setup

### 1. Clean Installation
```bash
cd ChainBallot
rm -rf node_modules yarn.lock
yarn install
```

### 2. Set Up Environment Variables
Create a `.env` file in the ChainBallot directory with:
```env
PRIVATE_KEY=your_private_key_here_without_0x_prefix
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

**To get a private key:**
- Use `npx hardhat generate` in a Hardhat project
- Or export from your MetaMask wallet (use with caution!)

### 3. Deploy Contracts
```bash
yarn compile
yarn deploy
```

### 4. Update Frontend Contract Addresses
After deployment, update these files with the deployed contract addresses:
- `frontend/create-nft.js`: Update `VotingPowerNFTAddress`
- `frontend/create-voting.js`: Update `ChainBallotAddress`
- `deployment-info.json`: Will be automatically updated

### 5. Test Frontend
```bash
yarn start
```
Then open http://localhost:3000 and test:
1. Connect wallet to GAI network
2. Mint NFTs to users
3. Create voting events
4. Vote with NFT ownership

## Contract Architecture

- **VotingPowerNFT**: ERC721 contract for minting voting power NFTs
- **ChainBallot**: Main voting contract that checks NFT ownership for voting eligibility

## Network Details

- **Network**: GAI Network
- **RPC**: `https://0x4e4542a6.rpc.aurora-cloud.dev`
- **Chain ID**: `1313161894`
- **Currency**: GAI (compatible with Ethereum tooling)

## Troubleshooting

### If yarn install still loops:
```bash
yarn cache clean --all
rm -rf node_modules yarn.lock
yarn install
```

### If deployment fails:
1. Check your private key in `.env`
2. Ensure sufficient GAI tokens for gas
3. Verify network connection

### If frontend shows errors:
1. Check browser console for specific errors
2. Ensure wallet is connected to GAI network
3. Verify contract addresses are updated after deployment

## Next Steps

1. Deploy contracts to get real addresses
2. Update frontend with deployed addresses
3. Test complete voting workflow
4. Consider upgrading to Hardhat 2.x and modern tooling

The project should now work correctly for both development and deployment!
