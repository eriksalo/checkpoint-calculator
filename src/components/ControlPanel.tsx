import React from 'react';
import { motion } from 'framer-motion';
import { useCalculatorState, WorkloadProfile } from '../state/useCalculatorState';

const profiles: Array<{ id: WorkloadProfile; label: string; description: string }> = [
  {
    id: 'hpc',
    label: 'HPC Simulation',
    description: 'Multi-physics workloads with checkpoint bursts on shared filesystems.'
  },
  {
    id: 'ai-training',
    label: 'AI Training',
    description: 'Deep learning training with distributed optimizers and frequent checkpoints.'
  },
  {
    id: 'inference',
    label: 'Inference',
    description: 'Latency-sensitive pipelines with periodic model snapshots.'
  }
];

export const ControlPanel: React.FC = () => {
  const {
    profile,
    nodes,
    checkpointSizeTb,
    intervalMinutes,
    retentionHours,
    storageTier,
    setProfile,
    setNodes,
    setCheckpointSizeTb,
    setIntervalMinutes,
    setRetentionHours,
    setStorageTier
  } = useCalculatorState();

  return (
    <motion.section
      className="glass-panel rounded-3xl p-8 space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <header>
        <h2 className="text-lg font-semibold text-aurora">Model your checkpoint strategy</h2>
        <p className="text-sm text-quartz/70">
          Tune workload, scale, and retention to explore throughput and storage trade-offs.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {profiles.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setProfile(item.id)}
            className={`flex flex-col gap-2 rounded-2xl border px-4 py-5 text-left transition duration-150 hover:border-aurora/60 hover:text-aurora ${
              profile === item.id ? 'border-aurora/80 text-aurora shadow-glow' : 'border-slate/50 text-quartz/80'
            }`}
          >
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-xs text-quartz/60">{item.description}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-quartz/60">
            <span>Nodes</span>
            <span>{nodes}</span>
          </div>
          <input
            type="range"
            min={64}
            max={4096}
            step={64}
            value={nodes}
            onChange={(event) => setNodes(Number(event.target.value))}
            className="accent-aurora"
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-quartz/60">
            <span>Checkpoint Size (TB)</span>
            <span>{checkpointSizeTb.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.1}
            value={checkpointSizeTb}
            onChange={(event) => setCheckpointSizeTb(Number(event.target.value))}
            className="accent-aurora"
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-quartz/60">
            <span>Interval (minutes)</span>
            <span>{intervalMinutes}</span>
          </div>
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={intervalMinutes}
            onChange={(event) => setIntervalMinutes(Number(event.target.value))}
            className="accent-aurora"
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-quartz/60">
            <span>Retention (hours)</span>
            <span>{retentionHours}</span>
          </div>
          <input
            type="range"
            min={1}
            max={72}
            step={1}
            value={retentionHours}
            onChange={(event) => setRetentionHours(Number(event.target.value))}
            className="accent-aurora"
          />
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {(
          [
            { id: 'local', label: 'Local NVMe', detail: 'Lowest latency, limited capacity.' },
            { id: 'burst-buffer', label: 'Burst Buffer', detail: 'Balanced throughput and scale.' },
            { id: 'object', label: 'Object Storage', detail: 'Elastic capacity, higher latency.' }
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setStorageTier(option.id)}
            className={`rounded-2xl border px-4 py-6 text-left transition hover:border-aurora/60 hover:text-aurora ${
              storageTier === option.id
                ? 'border-aurora/80 text-aurora shadow-glow'
                : 'border-slate/50 text-quartz/80'
            }`}
          >
            <span className="text-sm font-medium">{option.label}</span>
            <span className="mt-2 block text-xs text-quartz/60">{option.detail}</span>
          </button>
        ))}
      </div>
    </motion.section>
  );
};
