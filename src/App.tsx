import React from 'react';
import { AsciiHeader } from './components/AsciiHeader';
import { DashboardStats } from './components/DashboardStats';
import { TradingCharts } from './components/TradingCharts';
import { ConversionMetrics } from './components/ConversionMetrics';
import { ProductList } from './components/ProductList';

function App() {
  return (
    <div className="min-h-screen bg-black text-green-500 p-4 md:p-8 font-mono">
      <div className="max-w-[1400px] mx-auto">
        <AsciiHeader />
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <TradingCharts />
          </div>
          <div>
            <ConversionMetrics />
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
}

export default App;