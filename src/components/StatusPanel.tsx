import React from 'react';

export const StatusPanel = () => (
  <div className="mt-8 flex gap-4 text-sm">
    <div className="bg-green-900/20 p-4 rounded-lg">
      <div className="text-green-400 font-bold mb-2">System Status</div>
      <div className="flex gap-2">
        <span className="animate-pulse">●</span>
        <span>OPERATIONAL</span>
      </div>
    </div>
    <div className="bg-green-900/20 p-4 rounded-lg">
      <div className="text-green-400 font-bold mb-2">Last Update</div>
      <div>{new Date().toLocaleString()}</div>
    </div>
  </div>
);