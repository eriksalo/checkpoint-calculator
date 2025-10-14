import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useCalculatorState } from '../state/useCalculatorState';
import { computeOutputs } from '../utils/calculations';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0.6 },
  visible: { pathLength: 1, opacity: 1 }
};

export const FlowVisualizer: React.FC = () => {
  const state = useCalculatorState();
  const outputs = computeOutputs(state);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ pathLength: [0, 1], transition: { duration: 2.4, ease: 'easeInOut' } });
  }, [state, controls]);

  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-aurora">Checkpoint flow</h3>
          <p className="text-sm text-quartz/70">
            Visualize how checkpoints traverse tiers from compute nodes to durable storage.
          </p>
          <ul className="space-y-2 text-sm text-quartz/80">
            <li>
              <span className="font-medium text-aurora">{outputs.checkpointsPerDay}</span> checkpoints/day
            </li>
            <li>
              <span className="font-medium text-aurora">{outputs.dailyDataMovedTb} TB</span> of data movement daily
            </li>
            <li>
              <span className="font-medium text-aurora">{outputs.storageFootprintTb} TB</span> storage footprint
            </li>
            <li>
              <span className="font-medium text-aurora">{outputs.requiredThroughputGbps} Gbps</span> sustained throughput
            </li>
          </ul>
        </div>
        <div className="relative h-64">
          <svg viewBox="0 0 320 240" className="h-full w-full text-aurora/60">
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5DF2FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#5DF2FF" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            <motion.path
              d="M40 40 C 120 40, 120 120, 200 120 S 280 200, 300 200"
              stroke="url(#flowGradient)"
              strokeWidth="8"
              fill="transparent"
              variants={pathVariants}
              initial="hidden"
              animate={controls}
              strokeLinecap="round"
            />

            <motion.circle
              r="10"
              fill="#5DF2FF"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: ['0%', '100%'] }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
              style={{ offsetPath: 'path("M40 40 C 120 40, 120 120, 200 120 S 280 200, 300 200")' } as any}
            />
          </svg>
          <div className="absolute inset-0 grid grid-cols-3 text-center text-xs text-quartz/70">
            <div className="flex flex-col items-center justify-end gap-1 pb-4">
              <span className="rounded-full border border-aurora/60 px-4 py-1 text-aurora/80">Compute</span>
              <span>Nodes</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="rounded-full border border-aurora/60 px-4 py-1 text-aurora/80">{state.storageTier === 'local' ? 'NVMe' : 'Burst Buffer'}</span>
              <span>Checkpoint landing zone</span>
            </div>
            <div className="flex flex-col items-center justify-start gap-1 pt-4">
              <span className="rounded-full border border-aurora/60 px-4 py-1 text-aurora/80">Durable</span>
              <span>{state.storageTier === 'object' ? 'Object store' : 'Filesystem'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
