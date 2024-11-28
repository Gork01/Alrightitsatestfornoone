import React from 'react';
import { LineChart, ArrowUpCircle, Coins, TrendingDown, Percent, MinusCircle, CircleDot } from 'lucide-react';
import { tradingData } from '../data/tradingData';

const MetricRow = ({ label, value, icon: Icon }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-green-900/50 last:border-0">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
    <span className="font-bold">{value}</span>
  </div>
);

export const ConversionMetrics = () => {
  const today = tradingData[tradingData.length - 1];

  return (
    <div className="bg-green-900/20 p-4 rounded-lg border border-green-900/50">
      <div className="flex items-center gap-2 mb-4">
        <LineChart className="w-5 h-5" />
        <h2 className="text-green-400 font-bold">Daily Metrics</h2>
      </div>
      <div className="space-y-2">
        <MetricRow label="Today's Coins Called" value={today.coins} icon={Coins} />
        <MetricRow label="Today's Wins (2x+)" value={today.winX2Plus} icon={ArrowUpCircle} />
        <MetricRow label="Today's Wins (<2x)" value={today.winX2Less} icon={MinusCircle} />
        <MetricRow label="Today's Neutral" value={today.neutral} icon={CircleDot} />
        <MetricRow label="Total Gains" value={today.gains} icon={LineChart} />
        <MetricRow label="Total Dumps" value={today.dump} icon={TrendingDown} />
        <MetricRow label="Win Rate" value={today.winRate} icon={Percent} />
      </div>
    </div>
  );
};