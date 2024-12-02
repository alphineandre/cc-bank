// JavaScript code to manage the Bank Account system functionality

//Logout Button


function logout() {
            // Clearing session data
            localStorage.removeItem('userToken');
            sessionStorage.removeItem('userToken');
            document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Optional: Show a message before redirecting
            alert("You have successfully logged out!");

            // Redirect after 1 second (optional delay)
            setTimeout(function() {
                window.location.href = '/create-account.html'; // Redirect to login page
            }, 1000);
        }

let accountData = {
    name: "Kgomotso",
    surname: "Rakuba",
    chequeBalance: 1000.00,
    savingsBalance: 2000.00,
};

// Function to show the active tab and hide others
function showTab(tab) {
    // Hide all tabs
    let tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tabContent => tabContent.style.display = 'none');

    // Show the clicked tab
    document.getElementById(tab).style.display = 'block';

    // Highlight the active tab
    let tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab[onclick="showTab('${tab}')"]`).classList.add('active');
}

// Deposit functionality
function deposit() {
    let depositAmount = parseFloat(document.getElementById("depositAmount").value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    // Add to the selected account balance
    let accountType = document.getElementById("accountType").value;
    if (accountType === 'cheque') {
        accountData.chequeBalance += depositAmount;
    } else if (accountType === 'savings') {
        accountData.savingsBalance += depositAmount;
    }

    // Update the displayed balances
    updateBalances();

    // Clear input field
    document.getElementById("depositAmount").value = '';
}

// Withdrawal functionality
function withdraw() {
    let withdrawalAmount = parseFloat(document.getElementById("withdrawalAmount").value);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    // Check for sufficient balance
    let accountType = document.getElementById("accountType").value;
    let availableBalance = (accountType === 'cheque') ? accountData.chequeBalance : accountData.savingsBalance;

    if (withdrawalAmount > availableBalance) {
        showAlert("Insufficient balance.");
        return;
    }

    // Deduct from the selected account balance
    if (accountType === 'cheque') {
        accountData.chequeBalance -= withdrawalAmount;
    } else if (accountType === 'savings') {
        accountData.savingsBalance -= withdrawalAmount;
    }

    // Update the displayed balances
    updateBalances();

    // Clear input field
    document.getElementById("withdrawalAmount").value = '';
}

// Transfer functionality
function transfer() {
    let transferAmount = parseFloat(document.getElementById("transferAmount").value);
    if (isNaN(transferAmount) || transferAmount <= 0) {
        alert("Please enter a valid transfer amount.");
        return;
    }

    // Check for sufficient balance
    let accountType = document.getElementById("accountType").value;
    let availableBalance = (accountType === 'cheque') ? accountData.chequeBalance : accountData.savingsBalance;

    if (transferAmount > availableBalance) {
        showAlert("Insufficient balance.");
        return;
    }

    // Deduct from the selected account and add to the transfer account
    let transferTo = document.getElementById("transferAccountType").value;
    if (accountType === 'cheque') {
        accountData.chequeBalance -= transferAmount;
    } else if (accountType === 'savings') {
        accountData.savingsBalance -= transferAmount;
    }

    if (transferTo === 'cheque') {
        accountData.chequeBalance += transferAmount;
    } else if (transferTo === 'savings') {
        accountData.savingsBalance += transferAmount;
    }

    // Update the displayed balances
    updateBalances();

    // Clear input field
    document.getElementById("transferAmount").value = '';
}

// Update account balances on the page
function updateBalances() {
    document.getElementById("chequeBalance").textContent = `R${accountData.chequeBalance.toFixed(2)}`;
    document.getElementById("savingsBalance").textContent = `R${accountData.savingsBalance.toFixed(2)}`;
}

// Alert functionality for insufficient balance
function showAlert(message) {
    let alertBox = document.getElementById("insufficientAlert");
    let alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

// Close the alert box
function closeAlert() {
    document.getElementById("insufficientAlert").style.display = 'none';
}

// Set default active tab
window.onload = function() {
    showTab('deposit');
};
