import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#2A2420', '#8C7A6B', '#D9C5B2', '#E6DFD8', '#13100E'];

export const DashboardOverview = () => {
  const { transactions } = useContext(AppContext);

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // Prepare data for line chart
  const dateMap = {};
  [...transactions].reverse().forEach(t => {
    if (!dateMap[t.date]) dateMap[t.date] = { date: t.date, Income: 0, Expense: 0 };
    dateMap[t.date][t.type] += t.amount;
  });

  let runningBalance = 0;
  const trendData = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date)).map(d => {
    runningBalance += (d.Income - d.Expense);
    return { date: d.date.substring(5), balance: runningBalance }; // MM-DD
  });

  // Prepare data for pie chart
  const categoryMap = {};
  transactions.filter(t => t.type === 'Expense').forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const pieData = Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

      {/* 1. Main Balance */}
      <div className="bento-panel cream lg:row-span-2 flex justify-between" style={{ padding: '2.5rem', position: 'relative' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 1 }}>thwyzi</h2>
          <p style={{ marginTop: '3rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted-dark)' }}>
            Total Asset Balance<br />ACROSS ALL ACCOUNTS
          </p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="btn-pill dark" style={{ padding: '0.5rem 1rem' }}>
            Overview <span className="btn-icon light" style={{ width: 24, height: 24, padding: 0, marginLeft: '0.5rem' }}>+</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', marginTop: 'auto', letterSpacing: '-0.05em' }}>₹{balance.toLocaleString()}</h2>
        </div>
      </div>

      {/* 2. Top Income/Expense Split (Span 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
        <div className="bento-panel light relative" style={{ minHeight: '200px' }}>
          <div className="flex justify-between items-start mb-4">
            <p style={{ fontWeight: 500, color: 'var(--text-muted-dark)' }}>Total Income</p>
            <div className="btn-icon dark"><ArrowUpRight size={18} /></div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginTop: 'auto', alignSelf: 'flex-start' }}>₹{totalIncome.toLocaleString()}</h2>
        </div>

        <div className="bento-panel dark relative" style={{ minHeight: '200px' }}>
          <div className="flex justify-between items-start mb-4">
            <div className="btn-pill" style={{ fontSize: '0.7rem', padding: '0.2rem 0.8rem', background: 'rgba(255,255,255,0.1)' }}>NEW IN</div>
            <div className="btn-icon light"><ArrowDownRight size={18} /></div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginTop: 'auto', alignSelf: 'flex-start' }}>₹{totalExpense.toLocaleString()}</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted-light)' }}>Total Expense</p>
        </div>
      </div>

      {/* 3. Charts (Span 2) */}
      <div className="bento-panel dark lg:col-span-2 p-0 relative overflow-hidden" style={{ minHeight: '350px' }}>
        <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center pointer-events-none">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Balance Trend</h3>
          <div className="btn-icon light pointer-events-auto"><Target size={18} /></div>
        </div>
        <div style={{ height: '100%', width: '100%', paddingTop: '4rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-light)', color: 'var(--text-dark)', border: 'none', borderRadius: '1rem' }} />
              <Line type="monotone" dataKey="balance" stroke="var(--bg-cream)" strokeWidth={4} dot={false} activeDot={{ r: 8, fill: 'var(--bg-dark)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
