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

// Check if all elements are selected
console.log(form);
console.log(textInput);
console.log(amountInput);
console.log(transactionsList);
console.log(balanceEl);
console.log(incomeEl);
console.log(expenseEl);
// Get transactions from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
console.log(transactions);

// 👇 Yahan se add karo
function addTransaction(event) {
    event.preventDefault();

    const text = textInput.value.trim();
    const amount = Number(amountInput.value);

    if (text === "" || amount === 0) {
        alert("Please enter a description and a valid amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text,
        amount: amount
    };

    transactions.push(transaction);

    console.log(transactions);

    form.reset();
}
form.addEventListener("submit", addTransaction);
