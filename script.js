// ==========================================
// DOM ELEMENTS
// ==========================================

const form = document.getElementById("form");

const textInput = document.getElementById("text");

const amountInput = document.getElementById("amount");

const transactionsList = document.getElementById("transactions");

const balanceEl = document.getElementById("balance");

const incomeEl = document.getElementById("income");

const expenseEl = document.getElementById("expense");


// ==========================================
// APPLICATION STATE
// ==========================================

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];


// ==========================================
// ADD TRANSACTION
// ==========================================

function addTransaction(event){

    event.preventDefault();

    const text = textInput.value.trim();

    let amount = Number(amountInput.value);

    const selectedType =
    document.querySelector(
        'input[name="type"]:checked'
    ).value;


    // Validation

    if(text === "" || amount <= 0){

        alert("Please enter valid details.");

        return;

    }


    // Expense ko negative banana

    if(selectedType === "expense"){

        amount = -amount;

    }


    const transaction = {

        id: Date.now(),

        text: text,

        amount: amount

    };


    transactions.push(transaction);

    updateLocalStorage();

    renderTransactions();

    form.reset();

}



// ==========================================
// DELETE TRANSACTION
// ==========================================

function deleteTransaction(id){

    transactions = transactions.filter(function(transaction){

        return transaction.id !== id;

    });


    updateLocalStorage();

    renderTransactions();

}



// ==========================================
// LOCAL STORAGE
// ==========================================

function updateLocalStorage(){

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

}
// ==========================================
// RENDER TRANSACTIONS
// ==========================================

function renderTransactions() {

    transactionsList.innerHTML = "";

    if (transactions.length === 0) {

        transactionsList.innerHTML = `
            <p class="empty">
                No Transactions Found
            </p>
        `;

        updateSummary();

        return;

    }

    transactions.forEach(function (transaction) {

        const li = document.createElement("li");

        const type =
            transaction.amount > 0 ? "income" : "expense";

        li.innerHTML = `

            <div class="transaction-info">

                <div class="transaction-title">

                    ${transaction.text}

                </div>

                <span class="badge ${type}">

                    ${type === "income" ? "Income" : "Expense"}

                </span>

            </div>

            <div class="transaction-right">

                <span class="amount ${type}">

                    ${transaction.amount > 0 ? "+" : "-"}

                    ₹${Math.abs(transaction.amount).toFixed(2)}

                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                    title="Delete Transaction"
                >

                    🗑️

                </button>

            </div>

        `;

        transactionsList.appendChild(li);

    });

    updateSummary();

}



// ==========================================
// UPDATE SUMMARY
// ==========================================

function updateSummary() {

    const amounts = transactions.map(function (transaction) {

        return transaction.amount;

    });


    const balance = amounts
        .reduce(function (total, amount) {

            return total + amount;

        }, 0);


    const income = amounts
        .filter(function (amount) {

            return amount > 0;

        })
        .reduce(function (total, amount) {

            return total + amount;

        }, 0);


    const expense = amounts
        .filter(function (amount) {

            return amount < 0;

        })
        .reduce(function (total, amount) {

            return total + amount;

        }, 0);


    balanceEl.textContent =
        `₹${balance.toFixed(2)}`;

    incomeEl.textContent =
        `₹${income.toFixed(2)}`;

    expenseEl.textContent =
        `₹${Math.abs(expense).toFixed(2)}`;

}



// ==========================================
// EVENT LISTENER
// ==========================================

form.addEventListener(

    "submit",

    addTransaction

);



// ==========================================
// INITIAL RENDER
// ==========================================

renderTransactions();