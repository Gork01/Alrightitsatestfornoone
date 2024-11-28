import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { tradingData } from '../data/tradingData';
import { LineChart, Calendar, Filter } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const createOptions = (isDaily: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#22c55e',
        font: {
          family: 'monospace'
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: '#22c55e20'
      },
      ticks: {
        color: '#22c55e',
        font: {
          family: 'monospace'
        }
      },
      offset: isDaily
    },
    y: {
      grid: {
        color: '#22c55e20'
      },
      ticks: {
        color: '#22c55e',
        font: {
          family: 'monospace'
        },
        callback: function(value: any) {
          return value + '%';
        }
      },
      beginAtZero: true
    }
  },
  elements: {
    point: {
      radius: isDaily ? 8 : 3,
      hoverRadius: isDaily ? 10 : 5,
      borderWidth: isDaily ? 2 : 1
    },
    line: {
      tension: 0.4,
      borderWidth: isDaily ? 3 : 2
    }
  }
});

const TimeFilter = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className="bg-green-900/20 border border-green-900/50 text-green-500 rounded px-2 py-1 text-sm"
  >
    <option value="all">All Time</option>
    <option value="daily">Last 24h</option>
    <option value="weekly">Last 7 Days</option>
    <option value="monthly">Last 30 Days</option>
  </select>
);

const MetricFilter = ({ value, onChange }: { value: string[], onChange: (value: string[]) => void }) => {
  const options = [
    { id: 'gains', label: 'Gains', color: '#22c55e' },
    { id: 'winRate', label: 'Win Rate', color: '#60a5fa' },
    { id: 'winX2Less', label: 'Win <2x', color: '#fbbf24' },
    { id: 'neutral', label: 'Neutral', color: '#a78bfa' },
    { id: 'dumps', label: 'Dumps', color: '#ef4444' }
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map(option => (
        <label key={option.id} className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={value.includes(option.id)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, option.id]);
              } else {
                onChange(value.filter(v => v !== option.id));
              }
            }}
            className="hidden"
          />
          <span 
            className={`inline-flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors ${
              value.includes(option.id) 
                ? 'bg-green-900/40 border-green-500' 
                : 'bg-green-900/20 border-green-900/50'
            } border`}
            style={{ color: option.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: option.color }}></span>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export const TradingCharts = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedMetrics, setSelectedMetrics] = useState(['gains', 'winRate', 'winX2Less', 'neutral', 'dumps']);

  const getFilteredData = () => {
    const lastIndex = tradingData.length - 1;
    switch(timeFilter) {
      case 'daily':
        return [tradingData[lastIndex]];
      case 'weekly':
        return tradingData.slice(Math.max(0, lastIndex - 6));
      case 'monthly':
        return tradingData.slice(Math.max(0, lastIndex - 29));
      default:
        return tradingData;
    }
  };

  const filteredData = getFilteredData();
  const isDaily = timeFilter === 'daily';
  
  const dates = filteredData.map(day => day.date);
  const gains = filteredData.map(day => parseInt(day.gains));
  const winRates = filteredData.map(day => parseFloat(day.winRate));
  const winX2Less = filteredData.map(day => day.winX2Less);
  const neutral = filteredData.map(day => day.neutral);
  const dumps = filteredData.map(day => day.dump);

  const createDataset = (label: string, data: number[], color: string) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: color + '20',
    fill: !isDaily,
    borderWidth: isDaily ? 3 : 2,
    pointRadius: isDaily ? 8 : 3,
    pointHoverRadius: isDaily ? 10 : 5,
    pointBorderWidth: isDaily ? 2 : 1,
    spanGaps: true
  });

  const data = {
    labels: dates,
    datasets: [
      ...(selectedMetrics.includes('gains') ? [createDataset('Gains', gains, '#22c55e')] : []),
      ...(selectedMetrics.includes('winRate') ? [createDataset('Win Rate', winRates, '#60a5fa')] : []),
      ...(selectedMetrics.includes('winX2Less') ? [createDataset('Win <2x', winX2Less, '#fbbf24')] : []),
      ...(selectedMetrics.includes('neutral') ? [createDataset('Neutral', neutral, '#a78bfa')] : []),
      ...(selectedMetrics.includes('dumps') ? [createDataset('Dumps', dumps, '#ef4444')] : [])
    ]
  };

  return (
    <div className="bg-green-900/20 p-4 rounded-lg border border-green-900/50">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5" />
          <h2 className="text-green-400 font-bold">Trading Performance Analysis</h2>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <TimeFilter value={timeFilter} onChange={setTimeFilter} />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <MetricFilter value={selectedMetrics} onChange={setSelectedMetrics} />
          </div>
        </div>
      </div>
      <div className="h-[400px]">
        <Line options={createOptions(isDaily)} data={data} />
      </div>
    </div>
  );
};