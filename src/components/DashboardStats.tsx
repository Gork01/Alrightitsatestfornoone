import React from 'react';
import { Users, TrendingUp, ArrowUpCircle, TrendingDown, Coins } from 'lucide-react';
import { tradingData } from '../data/tradingData';

const calculateTotals = () => {
  return tradingData.reduce((acc, day) => ({
    totalCoins: acc.totalCoins + day.coins,
    totalWins: acc.totalWins + day.winX2Plus,
    totalGains: Math.max(acc.totalGains, parseInt(day.gains)),
    totalDumps: acc.totalDumps + day.dump
  }), {
    totalCoins: 0,
    totalWins: 0,
    totalGains: 0,
    totalDumps: 0
  });
};

const StatCard = ({ title, value, change, icon: Icon }: any) => (
  <div className="bg-green-900/20 p-4 rounded-lg border border-green-900/50">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-green-400 font-bold">{title}</h3>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
      {change >= 0 ? '+' : ''}{change}% from last period
    </div>
  </div>
);

export const DashboardStats = () => {
  const totals = calculateTotals();
  const lastDay = tradingData[tradingData.length - 1];
  const prevDay = tradingData[tradingData.length - 2];
  const changeCalc = (current: number, previous: number) => 
    ((current - previous) / previous * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Coins Called"
        value={totals.totalCoins}
        change={changeCalc(lastDay.coins, prevDay.coins)}
        icon={Coins}
      />
      <StatCard
        title="Total Wins (2x+)"
        value={totals.totalWins}
        change={changeCalc(lastDay.winX2Plus, prevDay.winX2Plus)}
        icon={ArrowUpCircle}
      />
      <StatCard
        title="Total Gains"
        value={`+${totals.totalGains}%`}
        change={changeCalc(
          parseInt(lastDay.gains),
          parseInt(prevDay.gains)
        )}
        icon={TrendingUp}
      />
      <StatCard
        title="Total Dumps"
        value={totals.totalDumps}
        change={changeCalc(lastDay.dump, prevDay.dump)}
        icon={TrendingDown}
      />
    </div>
  );
};