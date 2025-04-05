/* js/components/pieChart.js */
/**
 * Calculates total income and expense amounts
 * @param {Array} transactions - Combined income and expense transactions
 * @returns {Object} Totals for income and expense
 */
function calculateIncomeExpenseTotals(transactions) {
    if (!transactions || !transactions.length) return { income: 0, expense: 0 };
    
    return transactions.reduce((totals, transaction) => {
        const amount = transaction.amount;
        const isIncome = transaction.type === 'income';
        
        if (isIncome) {
            totals.income += amount;
        } else {
            totals.expense += amount;
        }
        
        return totals;
    }, { income: 0, expense: 0 });
}

/**
 * Creates and renders income vs expense pie chart
 * @param {Array} transactions - Combined transactions data
 */
function renderPieChart(transactions) {
    const canvas = document.getElementById('incomeExpensePie');
    if (!canvas) {
        console.error('Pie chart canvas element not found');
        return;
    }
    
    // Calculate totals
    const { income, expense } = calculateIncomeExpenseTotals(transactions);
    console.log('Pie chart data:', { income, expense });
    
    // Configure chart
    const ctx = canvas.getContext('2d');
    
    // Check if Chart is defined
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library is not loaded');
        return;
    }
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Incomes', 'Expenses'],
            datasets: [{
                data: [income, expense],
                backgroundColor: [
                    '#4ade80', // Green for income
                    '#f87171'  // Red for expense
                ],
                borderColor: [
                    '#4ade80',
                    '#f87171'
                ],
                borderWidth: 1,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = income + expense;
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    console.log('Pie chart rendered successfully');
}

// Wait for balanceChart.js to finish its initialization
document.addEventListener('DOMContentLoaded', function() {
    // Wait a short time to ensure other scripts have initialized
    setTimeout(function() {
        console.log('Initializing pie chart...');
        
        // Use the existing allTransactions array if available
        if (window.allTransactions && window.allTransactions.length) {
            console.log('Using existing transactions data');
            renderPieChart(window.allTransactions);
        } else {
            console.log('Loading new transactions data for pie chart');
            
            // Load transactions data if not already loaded
            Promise.allSettled([
                loadJSON('data/incomes.json'),
                loadJSON('data/expenses.json')
            ]).then(([incomes, expenses]) => {
                const allTransactions = [
                    ...processTransactionData(incomes.value || [], 'income'),
                    ...processTransactionData(expenses.value || [], 'expense')
                ];
                
                renderPieChart(allTransactions);
            }).catch(error => {
                console.error('Failed to load transactions for pie chart:', error);
            });
        }
    }, 100); // Short delay to ensure other scripts have run
});