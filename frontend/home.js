// Contract ABI for ChainBallot contract
const VotingABI = [
  {
    inputs: [],
    name: "votingCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOngoingVotings",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
    ],
    name: "getVotingDetails",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
    ],
    name: "getStartDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
    ],
    name: "getEndDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
    ],
    name: "getCandidates",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
      {
        internalType: "string",
        name: "candidate",
        type: "string",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "hasVoterVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
    ],
    name: "getVotingData",
    outputs: [
      {
        internalType: "string[]",
        name: "candidates",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "votesCount",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// GAI Network Configuration
const GAI_NETWORK = {
  chainId: '0x4E4542A6', // 1313161894 in hex
  chainName: 'Gyansetu AI',
  nativeCurrency: {
    name: 'Gyansetu AI',
    symbol: 'GAI',
    decimals: 18,
  },
  rpcUrls: ['https://0x4e4542a6.rpc.aurora-cloud.dev'],
  blockExplorerUrls: ['https://0x4e4542a6.explorer.aurora-cloud.dev'],
};

// Contract addresses on GAI network
const CONTRACT_ADDRESSES = {
  voting: "0x9a836494aCB32fb1721eCbe976C13291dd91597f", // ChainBallot contract
  nft: "0xb22d24BE5d608e5BD33d2b5D936A80b74d445CCd"    // VotingPowerNFT contract
};

let web3;
let votingContract;

// Initialize web3 and contract
async function init() {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      showError("Please install MetaMask to use this application");
      return;
    }

    // Initialize Web3 with MetaMask provider
    web3 = new Web3(window.ethereum);

    // Check current network and switch if necessary
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== GAI_NETWORK.chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: GAI_NETWORK.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [GAI_NETWORK],
            });
          } catch (addError) {
            showError("Please add GAI Network to MetaMask manually");
            return;
          }
        }
      }
    }

    // Initialize contracts (addresses will be updated after deployment)
    if (CONTRACT_ADDRESSES.voting !== "0x0000000000000000000000000000000000000000") {
      votingContract = new web3.eth.Contract(VotingABI, CONTRACT_ADDRESSES.voting);
    }

    const walletDropdown = document.querySelector(".wallet-dropdown");
    walletDropdown.classList.remove("wallet-connected");

    const storedAccount = localStorage.getItem("connectedWallet");
    if (storedAccount) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0];
        if (account && account.toLowerCase() === storedAccount.toLowerCase()) {
          handleWalletConnected(account);
        } else {
          localStorage.removeItem("connectedWallet");
        }
      } catch (error) {
        localStorage.removeItem("connectedWallet");
      }
    }

    await fetchOngoingVotings();
  } catch (error) {
    console.error("Error initializing:", error);
    showError("Error initializing: " + error.message);
  }
}

// Handle wallet connection
async function connectWallet() {
  try {
    if (typeof window.ethereum === 'undefined') {
      showError("Please install MetaMask to connect your wallet");
      return;
    }

    // Request account access first
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];

      // Check current network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId !== GAI_NETWORK.chainId) {
        try {
          // Try to switch to GAI network
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: GAI_NETWORK.chainId }],
          });
        } catch (switchError) {
          // Network not added, add it
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [GAI_NETWORK],
              });
            } catch (addError) {
              showError("Please add GAI Network to MetaMask manually and refresh");
              return;
            }
          } else {
            showError("Please switch to GAI Network in MetaMask");
            return;
          }
        }
      }

      handleWalletConnected(account);
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    showError("Error connecting wallet: " + error.message);
  }
}

function handleWalletConnected(account) {
  const connectButton = document.getElementById("connect-wallet");
  const buttonText = connectButton.querySelector("span");
  const walletDropdown = document.querySelector(".wallet-dropdown");

  buttonText.textContent = `${account.substring(0, 6)}...${account.substring(
    account.length - 4
  )}`;
  connectButton.disabled = false;
  connectButton.style.backgroundColor = "#27ae60";
  walletDropdown.classList.add("wallet-connected");
  localStorage.setItem("connectedWallet", account);
}

// Create voting button handler
document.getElementById("create-voting-btn").addEventListener("click", () => {
  window.location.href = "create-nft.html";
});

// Connect wallet button handler
document.getElementById("connect-wallet").addEventListener("click", connectWallet);

// Profile button handler
document.getElementById("profile-btn").addEventListener("click", () => {
  window.location.href = "profile.html";
});

// Disconnect button handler
document.getElementById("disconnect-btn").addEventListener("click", () => {
  localStorage.removeItem("connectedWallet");
  const connectButton = document.getElementById("connect-wallet");
  const buttonText = connectButton.querySelector("span");
  const walletDropdown = document.querySelector(".wallet-dropdown");

  buttonText.textContent = "Connect Wallet";
  connectButton.disabled = false;
  connectButton.style.backgroundColor = "#3498db";
  walletDropdown.classList.remove("wallet-connected");

  // Reinitialize with read-only provider when disconnected
  web3 = new Web3(new Web3.providers.HttpProvider(GAI_NETWORK.rpcUrls[0]));
  if (CONTRACT_ADDRESSES.voting !== "0x0000000000000000000000000000000000000000") {
    votingContract = new web3.eth.Contract(VotingABI, CONTRACT_ADDRESSES.voting);
  }
});

// Fixed fetch function: batching to avoid rate limits
async function fetchOngoingVotings() {
  try {
    // Check if contracts are deployed and valid
    if (!votingContract || CONTRACT_ADDRESSES.voting === "0x0000000000000000000000000000000000000000") {
      const votingsContainer = document.getElementById("ongoing-votings");
      votingsContainer.innerHTML = `
        <div class="info-message">
          <h3>🚀 Smart Contracts Not Yet Deployed</h3>
          <p>The ChainBallot smart contracts need to be deployed to the GAI network.</p>
          <p><strong>Follow these steps:</strong></p>
          <ol>
            <li>Run: <code>yarn compile</code></li>
            <li>Run: <code>yarn deploy</code></li>
            <li>Copy the deployed contract addresses</li>
            <li>Run: <code>node scripts/update-addresses.js &lt;NFT_ADDRESS&gt; &lt;VOTING_ADDRESS&gt;</code></li>
            <li>Refresh this page</li>
          </ol>
        </div>
      `;
      return;
    }

    const votingsContainer = document.getElementById("ongoing-votings");
    votingsContainer.innerHTML = "";

    // Test contract connection first
    try {
      await votingContract.methods.votingCounter().call();
    } catch (testError) {
      console.error("Contract connection test failed:", testError);
      votingsContainer.innerHTML = `
        <div class="error-message">
          <h3>❌ Contract Connection Failed</h3>
          <p>The deployed contract might have ABI mismatch or network issues.</p>
          <p><strong>Try these solutions:</strong></p>
          <ol>
            <li>Re-deploy contracts: <code>yarn deploy</code></li>
            <li>Update addresses: <code>node scripts/update-addresses.js</code></li>
            <li>Check if you're on GAI Network in MetaMask</li>
            <li>Clear browser cache and refresh</li>
          </ol>
          <p>Error: ${testError.message}</p>
        </div>
      `;
      return;
    }

    const ongoingVotings = await votingContract.methods
      .getOngoingVotings()
      .call();

    if (!ongoingVotings || ongoingVotings.length === 0) {
      votingsContainer.innerHTML = `
        <div class="info-message">
          <h3>📝 No Ongoing Votings</h3>
          <p>Create your first voting session!</p>
          <a href="create-voting.html" class="btn-primary">Create Voting</a>
        </div>
      `;
      return;
    }

    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "loading-indicator";
    loadingIndicator.innerHTML = "<p>Loading votings...</p>";
    votingsContainer.appendChild(loadingIndicator);

    const concurrencyLimit = 3; // Reduced for stability
    const results = [];

    for (let i = 0; i < ongoingVotings.length; i += concurrencyLimit) {
      const batch = ongoingVotings.slice(i, i + concurrencyLimit);
      const batchPromises = batch.map(async (identifier) => {
        try {
          const [details, startTime, endTime] = await Promise.all([
            votingContract.methods.getVotingDetails(identifier).call(),
            votingContract.methods.getStartDate(identifier).call(),
            votingContract.methods.getEndDate(identifier).call(),
          ]);
          return {
            identifier,
            title: details[0] || "Untitled",
            description: details[1] || "No description available",
            nftContract:
              details[2] || "0x0000000000000000000000000000000000000000",
            startTime: Number(startTime) * 1000,
            endTime: Number(endTime) * 1000,
          };
        } catch (error) {
          console.error(`Error loading voting ${identifier}:`, error);
          return {
            identifier,
            error: true,
            errorMessage: error.message || "Could not load voting details",
          };
        }
      });
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    votingsContainer.removeChild(loadingIndicator);

    // Sort: Ongoing first, Ended after
    results.sort((a, b) => {
      const aEnded = a.endTime <= Date.now();
      const bEnded = b.endTime <= Date.now();
      return aEnded - bEnded; // false (0) comes before true (1)
    });

    results.forEach((data) => {
      if (data.error) {
        const errorCard = document.createElement("div");
        errorCard.className = "voting-card error";
        errorCard.innerHTML = `
            <h3>⚠️ Error Loading Voting</h3>
            <p><strong>Identifier:</strong> ${data.identifier}</p>
            <p class="error-message">${data.errorMessage}</p>
            <button onclick="location.reload()" class="btn-secondary">Retry</button>
        `;
        votingsContainer.appendChild(errorCard);
      } else {
        const votingCard = createVotingCard(data);
        votingsContainer.appendChild(votingCard);
      }
    });
  } catch (error) {
    console.error("Error fetching ongoing votings:", error);
    const votingsContainer = document.getElementById("ongoing-votings");
    votingsContainer.innerHTML = `
      <div class="error-message">
        <h3>❌ Failed to Load Votings</h3>
        <p>Error: ${error.message}</p>
        <p><strong>Possible solutions:</strong></p>
        <ol>
          <li>Check if contracts are deployed: <code>yarn deploy</code></li>
          <li>Verify GAI Network connection in MetaMask</li>
          <li>Update contract addresses: <code>node scripts/update-addresses.js</code></li>
          <li>Clear browser cache and refresh</li>
        </ol>
        <button onclick="location.reload()" class="btn-primary">Retry</button>
      </div>
    `;
  }
}

function createVotingCard(voting) {
  const card = document.createElement("div");
  card.className = "voting-card";

  const isOngoing = voting.endTime > Date.now();
  const statusClass = isOngoing ? "status-ongoing" : "status-ended";
  const statusText = isOngoing ? "Ongoing" : "Ended";

  const startTimeIST = new Date(voting.startTime).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const endTimeIST = new Date(voting.endTime).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
 
  card.innerHTML = `
        <h3>${voting.title}</h3>
        <p>${voting.description}</p>
        <p class="voting-id">Voting ID: ${voting.identifier}</p>
        <p class="nft-contract">NFT Contract: <span class="contract-address">${
          voting.nftContract
        }</span></p>
        <div class="time-info">
            <p>Start: ${startTimeIST} (IST)</p>
            <p>End: ${endTimeIST} (IST)</p>
        </div>
        <span class="status ${statusClass}">${statusText}</span>
        ${
          isOngoing
            ? `<a href="vote.html?id=${voting.identifier}" class="btn-vote btn-vote-now" >Vote Now</a>`
            : `<a href="result.html?id=${voting.identifier}" class="btn-result" >View Result</a>`
        }
    `;

  return card;
}

// Helper to show errors
function showError(message) {
  const votingsContainer = document.getElementById("ongoing-votings");
  votingsContainer.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <p>Please try refreshing the page or check your network connection.</p>
        </div>
    `;
}

// Start app
window.addEventListener("load", init);

// Add MetaMask event listeners for network changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      handleWalletConnected(accounts[0]);
    } else {
      // Handle disconnection
      document.getElementById("disconnect-btn").click();
    }
  });

  window.ethereum.on('chainChanged', (chainId) => {
    if (chainId !== GAI_NETWORK.chainId) {
      showError("Please switch back to GAI Network");
    } else {
      // Reinitialize the app
      init();
    }
  });
}
