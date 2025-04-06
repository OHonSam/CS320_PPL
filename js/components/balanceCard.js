/**
 * Calculates total balance from transactions
 * @param {Array} transactions - Combined income and expense transactions
 * @returns {number} Current total balance
 */
function calculateTotalBalance(transactions) {
    if (!transactions || !transactions.length) return 0;
    
    return transactions.reduce((total, transaction) => {
        const amount = transaction.amount;
        const isIncome = transaction.type === 'income';
        return total + (isIncome ? amount : -amount);
    }, 0);
}

/**
 * Calculates balance on a specific date
 * @param {Array} transactions - Combined income and expense transactions
 * @param {string} targetDate - Date in DD/MM/YYYY format
 * @returns {number} Balance on the target date
 */
function calculateBalanceOnDate(transactions, targetDate) {
    if (!transactions || !transactions.length) return 0;
    
    // Convert target date to timestamp for comparison
    const [targetDay, targetMonth, targetYear] = targetDate.split('/');
    const targetTimestamp = new Date(`${targetYear}-${targetMonth}-${targetDay}`).getTime();
    
    return transactions.reduce((total, transaction) => {
        // Parse transaction date
        const [day, month, year] = transaction.date.split('/');
        const transactionTimestamp = new Date(`${year}-${month}-${day}`).getTime();
        
        // Only include transactions on or before the target date
        if (transactionTimestamp <= targetTimestamp) {
            const amount = transaction.amount;
            const isIncome = transaction.type === 'income';
            return total + (isIncome ? amount : -amount);
        }
        
        return total;
    }, 0);
}

/**
 * Calculates balance change rate between two dates
 * @param {number} currentBalance - Current balance 
 * @param {number} previousBalance - Previous day's balance
 * @returns {number} Change rate percentage
 */
function calculateBalanceChangeRate(currentBalance, previousBalance) {
    if (previousBalance === 0) return 0;
    return ((currentBalance - previousBalance) / Math.abs(previousBalance)) * 100;
}

/**
 * Finds the previous day's date
 * @param {string} currentDate - Current date in DD/MM/YYYY format 
 * @returns {string} Previous date in DD/MM/YYYY format
 */
function getPreviousDate(currentDate) {
    const [day, month, year] = currentDate.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    date.setDate(date.getDate() - 1);
    
    const previousDay = String(date.getDate()).padStart(2, '0');
    const previousMonth = String(date.getMonth() + 1).padStart(2, '0');
    const previousYear = date.getFullYear();
    
    return `${previousDay}/${previousMonth}/${previousYear}`;
}

/**
 * Updates the balance card with the current balance and change rate
 * @param {Array} transactions - Combined transactions data
 */
function updateBalanceCard(transactions) {
    if (!transactions || !transactions.length) return;

    const balanceAmountElement = document.querySelector('.balance-amount');
    const balanceChangeElement = document.querySelector('.balance-change');
    
    if (!balanceAmountElement || !balanceChangeElement) {
        console.error('Balance card elements not found');
        return;
    }
    
    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => 
        parseTransactionDate(b) - parseTransactionDate(a)
    );
    
    // Get the most recent date from transactions
    const mostRecentDate = sortedTransactions[0].date;
    const previousDate = getPreviousDate(mostRecentDate);
    
    // Calculate current and previous balances
    const currentBalance = calculateTotalBalance(transactions);
    const previousBalance = calculateBalanceOnDate(transactions, previousDate);
    
    // Calculate change rate
    const changeRate = calculateBalanceChangeRate(currentBalance, previousBalance);
    
    // Update the balance card
    balanceAmountElement.textContent = `$${currentBalance.toFixed(2)}`;
    
    // Format and display change rate
    const formattedRate = Math.abs(changeRate).toFixed(2);
    const sign = changeRate >= 0 ? '+' : '-';
    balanceChangeElement.textContent = `${sign}${formattedRate}%`;
    
    // Set appropriate class based on change rate
    balanceChangeElement.className = 'balance-change';
    balanceChangeElement.classList.add(changeRate >= 0 ? 'positive-change' : 'negative-change');
    
    console.log('Balance card updated:', {
        currentBalance,
        previousBalance,
        changeRate,
        mostRecentDate,
        previousDate
    });
}

// Store the original initTransactions function (if any)
const originalInit = window.initTransactions || function(){};

// Override the initTransactions function to include balance card update
window.initTransactions = async function() {
    try {
        const [incomes, expenses] = await Promise.allSettled([
            loadJSON('data/incomes.json'),
            loadJSON('data/expenses.json')
        ]);
        const allTransactions = [
            ...processTransactionData(incomes.value || [], 'income'),
            ...processTransactionData(expenses.value || [], 'expense')
        ];
        window.allTransactions = allTransactions;
        
        // Call the original init function (if any) to render the table and chart
        if (typeof originalInit === 'function') {
            originalInit.call(window);
        }
        
        // Update balance card
        updateBalanceCard(allTransactions);
    } catch (error) {
        console.error('Transaction initialization error:', error);
    }
};

// Remove old listener and add new listener for the updated initTransactions function
document.removeEventListener('DOMContentLoaded', originalInit);
document.addEventListener('DOMContentLoaded', window.initTransactions);