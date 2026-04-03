import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Plus, Trash2 } from 'lucide-react';

export const TransactionsSection = () => {
  const { transactions, addTransaction, deleteTransaction, role } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const [newTx, setNewTx] = useState({ date: '', amount: '', category: '', type: 'Expense' });
  const [isAdding, setIsAdding] = useState(false);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.date || !newTx.amount || !newTx.category) return;
    addTransaction({ ...newTx, amount: parseFloat(newTx.amount) });
    setNewTx({ date: '', amount: '', category: '', type: 'Expense' });
    setIsAdding(false);
  };

  return (
    <div className="bento-panel cream" style={{ marginBottom: '2rem' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>Transactions</h3>
        {role === 'Admin' && (
          <button className="btn-pill dark" onClick={() => setIsAdding(!isAdding)}>
             {isAdding ? 'Cancel' : <><Plus size={16} /> Add Record</>}
          </button>
        )}
      </div>

      {isAdding && role === 'Admin' && (
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '1.5rem' }}>
          <input type="date" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} required style={{ background: '#fff', color: '#000', borderRadius: '1rem' }} />
          <input type="number" placeholder="Amount" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} required min="0.01" step="0.01" style={{ background: '#fff', color: '#000', borderRadius: '1rem' }} />
          <input type="text" placeholder="Category" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} required style={{ background: '#fff', color: '#000', borderRadius: '1rem' }} />
          <select value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value})} style={{ background: '#fff', color: '#000', borderRadius: '1rem' }}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
          <button type="submit" className="btn-pill dark" style={{ borderRadius: '1rem' }}>SAVE</button>
        </form>
      )}

      <div className="flex items-center gap-4 flex-wrap" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search size={18} className="text-muted-dark" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted-dark)' }} />
          <input 
            type="text" 
            placeholder="Search by category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', paddingLeft: '3rem', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '2rem' }}
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '2rem' }}>
          <option value="All">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '1.5rem', padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-muted-dark)' }}>
              <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.8rem' }}>Date</th>
              <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.8rem' }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.8rem' }}>Type</th>
              <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.8rem' }}>Amount</th>
              {role === 'Admin' && <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.8rem', textAlign: 'right' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted-dark)' }}>{t.date}</td>
                  <td style={{ padding: '1rem', fontWeight: 500, fontSize: '0.875rem' }}>{t.category}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '1rem',
                      backgroundColor: t.type === 'Income' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
                      color: t.type === 'Income' ? 'var(--text-dark)' : 'var(--text-muted-dark)',
                    }}>
                      {t.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, fontSize: '1rem' }}>₹{t.amount.toLocaleString()}</td>
                  {role === 'Admin' && (
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button className="btn-icon" style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: '#000' }} onClick={() => deleteTransaction(t.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
               <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted-dark)', fontSize: '0.875rem' }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
