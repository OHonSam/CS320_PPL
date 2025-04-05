/**
 * Calculates daily balance from transaction history
 * @param {Array} transactions - Combined income and expense transactions
 * @returns {Object} Dates and balances arrays for charting
 */
function calculateDailyBalance(transactions) {
    if (!transactions || !transactions.length) return { dates: [], balances: [] };
    
    // Sort transactions by date (oldest first for balance calculation)
    const sortedTransactions = [...transactions].sort((a, b) => 
        parseTransactionDate(a) - parseTransactionDate(b)
    );
    
    // Track balance over time with running total
    let balance = 0;
    const balanceByDate = {};
    
    sortedTransactions.forEach(transaction => {
        const amount = transaction.amount;
        const isIncome = transaction.type === 'income';
        
        // Update running balance
        balance += isIncome ? amount : -amount;
        
        // Store balance for this date
        balanceByDate[transaction.date] = balance;
    });
    
    // Convert to arrays for Chart.js
    const dates = Object.keys(balanceByDate);
    const balances = dates.map(date => balanceByDate[date]);
    
    return { dates, balances };
}

/**
 * Creates and renders balance chart
 * @param {Array} transactions - Combined transactions data
 */
function renderBalanceChart(transactions) {
    const canvas = document.getElementById('balanceChart');
    if (!canvas) return;
    
    // Calculate balance data
    const { dates, balances } = calculateDailyBalance(transactions);
    
    // Configure chart
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Balance',
                data: balances,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: (value) => `$${value.toFixed(2)}`
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `Balance: $${context.raw.toFixed(2)}`
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

/**
 * Updates existing initTransactions function to add chart rendering
 */
const originalInitTransactions = window.initTransactions;

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

        const sortedTransactions = sortTransactionsByDate(allTransactions);
        
        // Render transaction table
        renderTransactions(sortedTransactions);
        
        // Render balance chart
        renderBalanceChart(allTransactions);
    } catch (error) {
        console.error('Transaction initialization error:', error);
    }
};

// Remove previous event listener if it exists
document.removeEventListener('DOMContentLoaded', originalInitTransactions);

// Add new event listener
document.addEventListener('DOMContentLoaded', window.initTransactions);
