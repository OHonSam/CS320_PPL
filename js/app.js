function renderBalanceChart(transactions) {
    const canvas = document.getElementById('balanceChart');
    if (!canvas) return;
    
    // Calculate balance data
    const { dates, balances } = calculateDailyBalance(transactions);
    
    // Display current total balance
    const balanceAmountElement = document.getElementById('balance-amount');
    if (balanceAmountElement && balances.length > 0) {
        const currentBalance = balances[balances.length - 1];
        balanceAmountElement.textContent = `$${currentBalance.toFixed(2)}`;
        
        // Add class based on positive/negative balance
        balanceAmountElement.className = currentBalance >= 0 ? 'positive-balance' : 'negative-balance';
    }
    
    // Configure chart
    const ctx = canvas.getContext('2d');
    // ... existing chart configuration code ...
}