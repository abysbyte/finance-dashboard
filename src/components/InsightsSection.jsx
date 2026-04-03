import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const InsightsSection = () => {
  const { transactions } = useContext(AppContext);

  // Highest spending category
  const expenseMap = {};
  transactions.filter(t => t.type === 'Expense').forEach(t => {
    expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
  });

  let maxCategory = 'N/A';
  let maxAmount = 0;
  for (const [cat, amt] of Object.entries(expenseMap)) {
    if (amt > maxAmount) {
      maxAmount = amt;
      maxCategory = cat;
    }
  }

  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  let advice = "Re-evaluate expenditures.";
  if (savingsRate > 20) {
    advice = "Capital preserved effectively.";
  } else if (savingsRate > 0) {
    advice = "Moderate surplus retained.";
  }

  return (
    <div className="flex flex-col gap-6 w-full" style={{ marginBottom: '2rem' }}>
      <div className="bento-panel dark" style={{ flex: 1, minHeight: '200px' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted-light)', marginBottom: 'auto' }}>Primary Outflow</p>
        <div style={{ marginTop: '3rem' }}>
          <h4 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{maxCategory}</h4>
          <p style={{ color: 'var(--text-muted-light)' }}>
            Largest expense category at ₹{maxAmount.toLocaleString()}.
          </p>
        </div>
      </div>

      <div className="bento-panel light" style={{ flex: 1, minHeight: '200px' }}>
        <div className="flex justify-between">
           <p style={{ fontSize: '0.875rem', color: 'var(--text-muted-dark)' }}>Efficiency</p>
           <div className="btn-pill dark" style={{ padding: '0.25rem 0.75rem', fontSize: '0.7rem' }}>SCORE</div>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '3rem' }}>
          <h4 style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', marginBottom: '0.25rem', letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>{savingsRate.toFixed(1)}%</h4>
          <p style={{ color: 'var(--text-muted-dark)' }}>
            {advice}
          </p>
        </div>
      </div>
    </div>
  );
};
