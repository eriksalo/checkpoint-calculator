import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import { FlowVisualizer } from './components/FlowVisualizer';
import { InsightsPanel } from './components/InsightsPanel';
import { MetricsDeck } from './components/MetricsDeck';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight via-midnight/95 to-midnight text-quartz">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
        <header className="space-y-4 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.2em] text-aurora/80">
            VDURA // Data Resilience Studio
          </span>
          <h1 className="text-4xl font-semibold text-quartz md:text-5xl">
            Checkpoint pathfinder
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-quartz/70 md:mx-0">
            Explore how HPC and AI workloads move checkpoint data through compute tiers, burst buffers, and
            durable stores. Tune parameters to size throughput budgets and retention footprints confidently.
          </p>
        </header>

        <ControlPanel />
        <MetricsDeck />
        <FlowVisualizer />
        <InsightsPanel />
      </div>
    </div>
  );
};

export default App;
