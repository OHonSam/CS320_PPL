/**
 * Loads JSON data from file with error handling
 * @param {string} file - Path to JSON file
 * @returns {Promise<Array>} Loaded data or empty array on failure
 */
async function loadJSON(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Data loading error:', error);
        return [];
    }
}

/**
 * Formats date string with validation
 * @param {string} dateStr - Date in DD/MM/YYYY format
 * @returns {string} Formatted date string
 */
function formatDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date) ? dateStr : `${day}/${month}/${year}`;
}

/**
 * Formats currency with consistent decimal places
 * @param {number} amount - Transaction amount
 * @param {boolean} isIncome - Income/expense flag
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, isIncome = false) {
    const symbol = isIncome ? '+' : '-';
    return `${symbol}$${amount.toFixed(2)}`;
}

/**
 * Parses transaction date for sorting
 * @param {Object} transaction - Transaction object
 * @returns {number} Timestamp for sorting
 */
function parseTransactionDate(transaction) {
    const [day, month, year] = transaction.date.split('/');
    const time = transaction.time || '23:59';
    return new Date(`${year}-${month}-${day}T${time}`).getTime();
}

/**
 * Sorts transactions by date and time (newest first)
 * @param {Array} transactions - Array of transactions
 * @returns {Array} New sorted array
 */
function sortTransactionsByDate(transactions) {
    return [...transactions].sort((a, b) => 
        parseTransactionDate(b) - parseTransactionDate(a)
    );
}

/**
 * Renders transactions in table with performance optimization
 * @param {Array} transactions - Transactions to render
 */
function renderTransactions(transactions) {
    const tableBody = document.getElementById('transaction-body');
    const fragment = document.createDocumentFragment();

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        const isIncome = transaction.type === 'income';
        
        row.className = isIncome ? 'income' : 'expense';
        row.innerHTML = `
            <td class="transaction-date">${formatDate(transaction.date)}</td>
            <td>${transaction.time || '–'}</td>
            <td><span class="transaction-category">${transaction.category}</span></td>
            <td class="transaction-note">${transaction.note || '–'}</td>
            <td style="text-align: right; width: 120px">${formatCurrency(transaction.amount, isIncome)}</td>
            <td style="width: 40px; text-align: center">
                <img src="assets/edit.svg" alt="Edit" style="width: 16px; height: 16px; cursor: pointer;">
            </td>
        `;
        
        fragment.appendChild(row);
    });

    requestAnimationFrame(() => {
        tableBody.innerHTML = '';
        tableBody.appendChild(fragment);
    });
}

/**
 * Processes transaction data with defaults
 * @param {Array} data - Raw transaction data
 * @param {string} type - Transaction type
 * @returns {Array} Processed transactions
 */
function processTransactionData(data, type) {
    return data.map(item => ({
        ...item,
        type,
        time: item.time || '00:00'
    }));
}

/**
 * Initializes transaction management system
 */
async function initTransactions() {
    try {
        const [incomes, expenses] = await Promise.allSettled([
            loadJSON('data/incomes.json'),
            loadJSON('data/expenses.json')
        ]);

        const allTransactions = [
            ...processTransactionData(incomes.value || [], 'income'),
            ...processTransactionData(expenses.value || [], 'expense')
        ];

        renderTransactions(sortTransactionsByDate(allTransactions));
    } catch (error) {
        console.error('Transaction initialization error:', error);
    }
}

// Initialize transaction system when ready
document.addEventListener('DOMContentLoaded', initTransactions);
