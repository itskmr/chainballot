# 🚨 ChainBallot Troubleshooting Guide

## Common Issues & Solutions

### ❌ **Error: "Returned values aren't valid, did it run Out of Gas?"**

**This error occurs when:**
- Contracts aren't deployed properly
- ABI mismatch between deployed contract and frontend code
- Network connection issues
- Gas estimation problems

**✅ Solutions:**

#### 1. **Check Contract Deployment Status**
```bash
# Verify contracts are deployed
yarn deploy

# Check deployment info
cat deployment-info.json
```

**Expected output:**
```json
{
  "contracts": {
    "VotingPowerNFT": { "address": "0x...", "deployed": true },
    "ChainBallot": { "address": "0x...", "deployed": true }
  }
}
```

#### 2. **Update Contract Addresses**
```bash
# After deployment, copy addresses and run:
node scripts/update-addresses.js 0x_YOUR_NFT_ADDRESS 0x_YOUR_VOTING_ADDRESS
```

#### 3. **Verify Network Connection**
1. Open MetaMask
2. Ensure you're connected to **Gyansetu AI** network
3. Check if the network shows as "Connected"

#### 4. **Test Contract Connection**
```bash
# In browser console (F12 → Console):
web3.eth.getBalance("YOUR_WALLET_ADDRESS").then(console.log)
```

### ❌ **ChainBallot Icon Redirects to Vercel URL**

**✅ Fixed:** All hardcoded URLs have been replaced with relative paths. The logo now stays on `localhost:3000`.

### ❌ **MetaMask Shows Ethereum Instead of GAI**

**✅ Solutions:**

#### 1. **Auto-Switch (Built-in)**
- Click "Connect Wallet" - the app will automatically prompt to switch to GAI Network

#### 2. **Manual Network Switch**
1. Open MetaMask
2. Click network dropdown (top of MetaMask)
3. Select **"Gyansetu AI"** from the list
4. Refresh the page

#### 3. **Re-add GAI Network** (if missing)
1. Open MetaMask → Click "Add Network"
2. Enter:
   ```
   Network Name: Gyansetu AI
   RPC URL: https://0x4e4542a6.rpc.aurora-cloud.dev
   Chain ID: 1313161894
   Currency: GAI
   ```

### ❌ **"Contracts not deployed" Message**

**✅ Step-by-Step Fix:**

```bash
# 1. Clean and reinstall
cd ~/challenge-simple-nft-example/ChainBallot
rm -rf node_modules yarn.lock
yarn install

# 2. Set up environment
nano .env
# Add: PRIVATE_KEY=your_private_key_without_0x

# 3. Compile contracts
yarn compile

# 4. Deploy to GAI network
yarn deploy

# 5. Copy addresses from deployment output
# VotingPowerNFT: 0x...
# ChainBallot: 0x...

# 6. Update frontend addresses
node scripts/update-addresses.js 0x_NFT_ADDRESS 0x_VOTING_ADDRESS

# 7. Start server
yarn start

# 8. Refresh browser: http://localhost:3000/home.html
```

### ❌ **Endless `yarn install` Loop**

**✅ Fixed:** Added all missing peer dependencies to `package.json`. Run:
```bash
rm -rf node_modules yarn.lock
yarn install
```

### ❌ **Compilation Errors**

**✅ Solutions:**

#### 1. **Missing Dependencies**
```bash
yarn install
# All required dependencies are now included
```

#### 2. **Hardhat Version Issues**
```bash
# Check versions
node -v    # Should be 16+
yarn -v    # Should be installed

# Update if needed
npm install -g yarn
```

### ❌ **Transaction Fails During Voting**

**✅ Pre-flight Checks:**

#### 1. **Verify Wallet Balance**
- Ensure you have GAI tokens for gas fees
- Check: MetaMask → Network → Balance

#### 2. **Check NFT Ownership**
- You must own the required NFT to vote
- Check your NFTs in the voting interface

#### 3. **Network Confirmation**
- Ensure MetaMask shows "Gyansetu AI" network
- Transaction should show GAI as currency

### ❌ **404 Favicon Error**

**✅ Solution:** This is harmless. The app works fine without a favicon. To fix:
```bash
# Create a simple favicon
echo "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🗳️</text></svg>" > frontend/favicon.ico
```

## 🔧 **Advanced Debugging**

### Check Browser Console (F12)
```javascript
// Test Web3 connection
window.ethereum.chainId

// Test contract connection
web3.eth.getBalance("YOUR_ADDRESS")

// Check network
web3.eth.net.getId()
```

### Manual Contract Testing
```bash
# Start Hardhat console
yarn console --network gai

# Test deployment
contract = await ethers.getContractFactory("ChainBallot")
await contract.deploy()
```

### Network Diagnostics
```bash
# Check if GAI RPC is responding
curl -X POST https://0x4e4542a6.rpc.aurora-cloud.dev \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

## 📞 **Still Having Issues?**

### Quick Diagnostic Checklist:
- [ ] **Dependencies installed?** `yarn install`
- [ ] **Contracts deployed?** `yarn deploy`
- [ ] **Addresses updated?** `node scripts/update-addresses.js`
- [ ] **MetaMask on GAI Network?**
- [ ] **Environment file configured?** `.env` with `PRIVATE_KEY`
- [ ] **Server running?** `yarn start` on port 3000

### Get Help:
1. **Check the visual guide:** `http://localhost:3000/guide.html`
2. **Review console errors** (F12 → Console)
3. **Verify network connectivity**
4. **Check deployment logs**

## ✅ **Success Indicators**

When everything works:
- ✅ MetaMask auto-switches to GAI Network
- ✅ Logo stays on `localhost:3000`
- ✅ "Connect Wallet" shows your GAI address
- ✅ Voting cards load without errors
- ✅ Transactions execute on GAI Network

---

**🎉 You're all set! The app should now work perfectly on GAI Network!**
