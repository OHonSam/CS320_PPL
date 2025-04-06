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
 * Shows edit modal and populates form with transaction data
 * @param {Object} transaction - Transaction to edit
 * @param {number} index - Index in the transactions array
 */
function showEditModal(transaction, index) {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editTransactionForm');
    
    // Populate form fields
    document.getElementById('editTransactionId').value = index;
    document.getElementById('editTransactionType').value = transaction.type;
    document.getElementById('editDate').value = transaction.date;
    document.getElementById('editTime').value = transaction.time || '';
    document.getElementById('editCategory').value = transaction.category;
    document.getElementById('editNote').value = transaction.note || '';
    document.getElementById('editAmount').value = transaction.amount;
    
    modal.style.display = 'block';
}

/**
 * Updates transaction data and saves to file
 * @param {Object} updatedTransaction - Modified transaction data
 * @param {number} index - Index in transactions array
 */
async function updateTransaction(updatedTransaction, index) {
    try {
        const type = updatedTransaction.type;
        const filename = `data/${type}s.json`;
        
        // Load current data
        const response = await fetch(filename);
        let data = await response.json();
        
        // Find and update the transaction
        const transactionIndex = data.findIndex(t => 
            t.date === window.allTransactions[index].date && 
            t.amount === window.allTransactions[index].amount &&
            t.category === window.allTransactions[index].category
        );
        
        if (transactionIndex !== -1) {
            // Update the transaction
            const { type, ...transactionData } = updatedTransaction;
            data[transactionIndex] = transactionData;
            
            // Save back to file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const formData = new FormData();
            formData.append('file', blob, filename);
            
            const saveResponse = await fetch('/save', {
                method: 'POST',
                body: formData
            });
            
            if (!saveResponse.ok) {
                throw new Error('Failed to save changes');
            }
            
            // Update local data and re-render
            window.allTransactions[index] = updatedTransaction;
            renderTransactions(sortTransactionsByDate(window.allTransactions));
            
            // Update charts
            if (typeof updateBalanceChart === 'function') {
                updateBalanceChart(window.allTransactions);
            }
            if (typeof updatePieChart === 'function') {
                updatePieChart(window.allTransactions);
            }
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
        alert('Failed to save changes. Please try again.');
    }
}

// Event Listeners for Edit Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editTransactionForm');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.btn-cancel');
    
    // Close modal handlers
    const closeModal = () => modal.style.display = 'none';
    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;
    window.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
    
    // Form submission handler
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const index = parseInt(document.getElementById('editTransactionId').value);
        const updatedTransaction = {
            type: document.getElementById('editTransactionType').value,
            date: document.getElementById('editDate').value,
            time: document.getElementById('editTime').value,
            category: document.getElementById('editCategory').value,
            note: document.getElementById('editNote').value,
            amount: parseFloat(document.getElementById('editAmount').value)
        };
        
        await updateTransaction(updatedTransaction, index);
        closeModal();
    };
});

/**
 * Renders transactions in table with performance optimization
 * @param {Array} transactions - Transactions to render
 */
function renderTransactions(transactions) {
    const tableBody = document.getElementById('transaction-body');
    const fragment = document.createDocumentFragment();
    
    transactions.forEach((transaction, index) => {
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
        
        // Add click handler for edit button
        const editButton = row.querySelector('img[alt="Edit"]');
        editButton.onclick = () => showEditModal(transaction, index);
        
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

// Store transactions globally for edit operations
window.allTransactions = [];

/**
 * Initializes transaction management system
 */
async function initTransactions() {
    try {
        const [incomes, expenses] = await Promise.allSettled([
            loadJSON('data/incomes.json'),
            loadJSON('data/expenses.json')
        ]);

        window.allTransactions = [
            ...processTransactionData(incomes.value || [], 'income'),
            ...processTransactionData(expenses.value || [], 'expense')
        ];

        renderTransactions(sortTransactionsByDate(window.allTransactions));
    } catch (error) {
        console.error('Transaction initialization error:', error);
    }
}

// Initialize transaction system when ready
document.addEventListener('DOMContentLoaded', initTransactions);
