import React from 'react';
import { tradingData } from '../data/tradingData';
import { BarChart } from 'lucide-react';

export const SummaryStats = () => {
  const totals = tradingData.reduce((acc, day) => ({
    totalCoins: acc.totalCoins + day.coins,
    totalWinX2Plus: acc.totalWinX2Plus + day.winX2Plus,
    totalWinX2Less: acc.totalWinX2Less + day.winX2Less,
    totalNeutral: acc.totalNeutral + day.neutral,
    totalDump: acc.totalDump + day.dump,
  }), {
    totalCoins: 0,
    totalWinX2Plus: 0,
    totalWinX2Less: 0,
    totalNeutral: 0,
    totalDump: 0,
  });

  const totalWins = totals.totalWinX2Plus + totals.totalWinX2Less;
  const overallWinRate = ((totalWins / totals.totalCoins) * 100).toFixed(1);

  return (
    <div className="bg-green-900/20 p-4 rounded-lg border border-green-900/50 backdrop-blur">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-900/50">
        <BarChart className="w-5 h-5" />
        <span className="text-green-400 font-bold">Summary Statistics</span>
      </div>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total Coins:</span>
          <span className="font-bold">{totals.totalCoins}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Wins:</span>
          <span className="font-bold">{totalWins}</span>
        </div>
        <div className="flex justify-between">
          <span>Wins &gt;x2:</span>
          <span className="font-bold">{totals.totalWinX2Plus}</span>
        </div>
        <div className="flex justify-between">
          <span>Wins &lt;x2:</span>
          <span className="font-bold">{totals.totalWinX2Less}</span>
        </div>
        <div className="flex justify-between">
          <span>Neutral:</span>
          <span className="font-bold">{totals.totalNeutral}</span>
        </div>
        <div className="flex justify-between">
          <span>Dumps:</span>
          <span className="font-bold">{totals.totalDump}</span>
        </div>
        <div className="col-span-2 pt-2 mt-2 border-t border-green-900/50 flex justify-between">
          <span>Overall Win Rate:</span>
          <span className="font-bold">{overallWinRate}%</span>
        </div>
      </div>
    </div>
  );
};