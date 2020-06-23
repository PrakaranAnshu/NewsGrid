const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTranscations = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 },
// ];

const localStorageTransaction = JSON.parse(localStorage.getItem('transaction'));


let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transcation = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transcation);
        addTransactionDOM(transcation);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }

}

// Generate an id
function generateID() {
    return (Math.floor(Math.random() * 1000000000));
}

// Add transcation to DOM list
function addTransactionDOM(transcation) {
    // Get the sign
    const sign = transcation.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    // add class based on value
    item.classList.add(transcation.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
    ${transcation.text} <span>${sign}${Math.abs(transcation.amount)}</span> <button class='delete-btn' onclick="removeTransaction(${transcation.id})">x</button>
    `;
    list.appendChild(item);

}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transcation => transcation.amount);
    const totalAmount = amounts.reduce((a, b) => {
        return (a + b);
    }, 0).toFixed(2);

    const income = amounts.filter(item => {
        return item > 0;
    }).reduce((acc, item) => (acc += item), 0).toFixed(2);


    const expense = (amounts.filter(item => {
        return item < 0;
    }).reduce((acc, item) => (acc += item), 0).toFixed(2)) * -1;

    balance.innerText = '$' + totalAmount;
    money_plus.innerText = '$' + income;
    money_minus.innerText = '$' + expense;

}

// Remove Transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transcation => transcation.id !== id);
    updateLocalStorage();
    init();
}

// Update local storage 
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



//init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
