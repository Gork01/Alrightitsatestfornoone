import React from 'react';
import { LineChart } from 'lucide-react';
import { tradingData } from '../data/tradingData';

export const PerformanceGraph = () => {
  const gains = tradingData.map(day => parseInt(day.gains));
  const maxGain = Math.max(...gains);
  
  return (
    <div className="bg-green-900/20 p-4 rounded-lg border border-green-900/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5" />
          <h2 className="text-green-400 font-bold">Gains Performance</h2>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Daily Gains %</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] flex items-end justify-between gap-2">
        {gains.map((value, i) => (
          <div key={i} className="w-full">
            <div 
              className="bg-green-500 hover:bg-green-400 transition-colors"
              style={{ height: `${(value / maxGain) * 100}%` }}
              title={`${tradingData[i].date}: ${value}%`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};