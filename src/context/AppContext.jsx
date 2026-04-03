import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialTransactions = [
  { id: 1, date: '2023-10-01', amount: 5000, category: 'Salary', type: 'Income' },
  { id: 2, date: '2023-10-05', amount: 120, category: 'Groceries', type: 'Expense' },
  { id: 3, date: '2023-10-10', amount: 50, category: 'Entertainment', type: 'Expense' },
  { id: 4, date: '2023-10-15', amount: 1500, category: 'Rent', type: 'Expense' },
  { id: 5, date: '2023-10-20', amount: 300, category: 'Utilities', type: 'Expense' },
  { id: 6, date: '2023-10-25', amount: 200, category: 'Freelance', type: 'Income' }
];

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('Viewer');
  
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [{ ...transaction, id: Date.now() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      role, setRole, 
      transactions, addTransaction, deleteTransaction 
    }}>
      {children}
    </AppContext.Provider>
  );
};
