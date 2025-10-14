import React from 'react';
import { StatCard } from './StatCard';
import { useCalculatorState } from '../state/useCalculatorState';
import { computeOutputs } from '../utils/calculations';

export const MetricsDeck: React.FC = () => {
  const state = useCalculatorState();
  const outputs = computeOutputs(state);

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <StatCard label="Checkpoints / Day" value={outputs.checkpointsPerDay.toString()} caption="Rounded to nearest whole checkpoint." />
      <StatCard label="Daily Data Moved" value={`${outputs.dailyDataMovedTb} TB`} caption="Adjusted for workload profile multiplier." />
      <StatCard label="Retention Footprint" value={`${outputs.storageFootprintTb} TB`} caption={`Assumes ${state.retentionHours}h retention on ${state.storageTier.replace('-', ' ')}.`} accent="ember" />
      <StatCard label="Throughput" value={`${outputs.requiredThroughputGbps} Gbps`} caption={`Minimum sustained bandwidth for ${state.intervalMinutes}-minute cadence.`} />
    </section>
  );
};
