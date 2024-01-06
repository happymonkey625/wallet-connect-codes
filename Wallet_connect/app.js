
// Infura API key: 996eaae469b3450a9db76f1cd5cbc796
// crypto wallet address 1 - 0x6B8c2A871b8C6e8420E8dAF2765232b868d70D90 and asset = ETH
//crypto wallet address 2 - 0x60a31F0494Bd4AEB28D67c3B8F161a3996A96C21 and asset = ETH


// Path: index.html
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/996eaae469b3450a9db76f1cd5cbc796'));
//const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/996eaae469b3450a9db76f1cd5cbc796'));


async function getConversionRate() {
    // Fixed conversion rate for demonstration purposes
    // Example: 1 ETH = 2000 USD
    return 2000;
}

async function getBalance() {
    const address = document.getElementById('walletAddress').value;
    const cryptoAsset = document.getElementById('cryptoAsset').value.trim() || 'ETH'; // Use user input or default to 'ETH'

    if (!web3.utils.isAddress(address)) {
        alert('Invalid address');
        return;
    }

    // the crypto to ETH conversation rate is fixed for now
    try {
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
        const conversionRate = await getConversionRate(); // Fetch the conversion rate (fixed for now)
        const balanceUSD = balanceEther * conversionRate;
        document.getElementById('balance').innerText = `Balance: ${balanceEther} ETH (${balanceUSD.toFixed(2)} USD)`;
        addToTable(cryptoAsset, address, balanceEther, balanceUSD.toFixed(2));
    } catch (error) {
        console.error('An error occurred:', error);
        alert('There was an error fetching the balance');
    }
}

function addToTable(cryptoAsset,address, balanceEth, balanceUsd) {
    const table = document.getElementById('balanceTable');
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    
    
    
    cell1.innerText = cryptoAsset;
    cell2.innerText = address;
    cell3.innerText = `${balanceEth}`;
    cell4.innerText = `$${balanceUsd} USD`;

    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
        row.remove();
        updateTotalUsdValue();
    };
    cell5.appendChild(deleteButton);

    updateTotalUsdValue();
}

function updateTotalUsdValue() {
    let total = 0;
    const table = document.getElementById('balanceTable');
    for (let i = 1; i < table.rows.length; i++) {
        const value = table.rows[i].cells[3].innerText;
        total += parseFloat(value.replace(/[^0-9.-]+/g, ""));
    }
    document.getElementById('totalUsdValue').innerText = total.toFixed(2);
}
