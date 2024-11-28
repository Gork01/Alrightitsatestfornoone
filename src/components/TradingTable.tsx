import React from 'react';
import { Terminal } from 'lucide-react';
import { tradingData } from '../data/tradingData';

export const TradingTable = () => (
  <div className="overflow-x-auto">
    <div className="inline-flex items-center gap-2 mb-4">
      <Terminal className="w-5 h-5" />
      <span className="text-green-400 font-bold">Trading Performance Analysis</span>
    </div>
    
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-green-700">
          <th className="py-2 px-4 text-left">Date</th>
          <th className="py-2 px-4 text-left">Coins</th>
          <th className="py-2 px-4 text-left">Win &gt;x2</th>
          <th className="py-2 px-4 text-left">Win &lt;x2</th>
          <th className="py-2 px-4 text-left">Neutral</th>
          <th className="py-2 px-4 text-left">Dump</th>
          <th className="py-2 px-4 text-left">Gains</th>
          <th className="py-2 px-4 text-left">Win Rate</th>
        </tr>
      </thead>
      <tbody>
        {tradingData.map((day) => (
          <tr 
            key={day.date}
            className="border-b border-green-900 hover:bg-green-900/20 transition-colors"
          >
            <td className="py-2 px-4">{day.date}</td>
            <td className="py-2 px-4">{day.coins}</td>
            <td className="py-2 px-4">{day.winX2Plus}</td>
            <td className="py-2 px-4">{day.winX2Less}</td>
            <td className="py-2 px-4">{day.neutral}</td>
            <td className="py-2 px-4">{day.dump}</td>
            <td className="py-2 px-4">{day.gains}</td>
            <td className="py-2 px-4">{day.winRate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);