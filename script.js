// ===============================
// DOM ELEMENTS
// ===============================

// Form
const form = document.getElementById("form");

// Input Fields
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

// Transaction List
const transactionsList = document.getElementById("transactions");

// Summary Elements
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");


// ===============================
// LOAD DATA FROM LOCAL STORAGE
// ===============================

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// ===============================
// ADD TRANSACTION
// ===============================

function addTransaction(event) {

    event.preventDefault();

    const text = textInput.value.trim();
    const amount = Number(amountInput.value);


    // Validation
    if (text === "" || amount === 0) {
        alert("Please enter a description and a valid amount.");
        return;
    }


    // Create Transaction Object
    const transaction = {
        id: Date.now(),
        text: text,
        amount: amount
    };


    // Add to Array
    transactions.push(transaction);


    // Save Data
    updateLocalStorage();


    // Update UI
    renderTransactions();


    // Clear Form
    form.reset();
}



// ===============================
// SAVE DATA TO LOCAL STORAGE
// ===============================

function updateLocalStorage() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}
// 👇 YAHAN ADD KARO DELETE FUNCTION
function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });


    updateLocalStorage();

    renderTransactions();

}





// ===============================
// DISPLAY TRANSACTIONS
// ===============================

function renderTransactions() {


    // Clear Existing List
    transactionsList.innerHTML = "";


    // Loop Through Transactions
    transactions.forEach(function(transaction) {


        const li = document.createElement("li");


        // Income or Expense Class
        li.classList.add(
            transaction.amount > 0 ? "income" : "expense"
        );


        li.innerHTML = `
    ${transaction.text}

    <span>
        ${transaction.amount > 0 ? "+" : "-"}
        ₹${Math.abs(transaction.amount)}
    </span>

    <button onclick="deleteTransaction(${transaction.id})">
        X
    </button>
`;


        transactionsList.appendChild(li);

    });


    // Update Summary
    updateSummary();

}



// ===============================
// UPDATE BALANCE, INCOME, EXPENSE
// ===============================

function updateSummary() {


    // Get only amounts
    const amounts = transactions.map(function(transaction) {

        return transaction.amount;

    });



    // Total Balance
    const total = amounts.reduce(function(sum, amount) {

        return sum + amount;

    }, 0);



    // Income
    const income = amounts
        .filter(function(amount) {

            return amount > 0;

        })
        .reduce(function(sum, amount) {

            return sum + amount;

        }, 0);



    // Expense
    const expense = amounts
        .filter(function(amount) {

            return amount < 0;

        })
        .reduce(function(sum, amount) {

            return sum + amount;

        }, 0);



    // Update HTML

    balanceEl.innerText = `₹${total.toFixed(2)}`;

    incomeEl.innerText = `₹${income.toFixed(2)}`;

    expenseEl.innerText = `₹${Math.abs(expense).toFixed(2)}`;

}



// ===============================
// EVENT LISTENER
// ===============================

form.addEventListener("submit", addTransaction);



// ===============================
// INITIAL LOAD
// ===============================

renderTransactions();