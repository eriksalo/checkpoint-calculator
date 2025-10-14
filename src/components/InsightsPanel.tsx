import React from 'react';
import { useCalculatorState } from '../state/useCalculatorState';
import { computeOutputs } from '../utils/calculations';

export const InsightsPanel: React.FC = () => {
  const state = useCalculatorState();
  const outputs = computeOutputs(state);

  const focusAreas = [
    {
      title: 'Bandwidth guardrails',
      body: `You need ${outputs.requiredThroughputGbps} Gbps sustained to keep up with checkpoint flushes. Burst buffers or RDMA-enabled fabrics can absorb spikes from ${state.nodes} nodes.`
    },
    {
      title: 'Retention budget',
      body: `Retaining data for ${state.retentionHours} hours consumes ~${outputs.storageFootprintTb} TB across ${state.storageTier.replace('-', ' ')}. Align policy with recovery objectives.`
    },
    {
      title: 'Automation hooks',
      body: 'Export these parameters into infrastructure-as-code to size S3 buckets, FSx for Lustre, or EBS fleets automatically.'
    }
  ];

  return (
    <section className="glass-panel rounded-3xl p-8">
      <h3 className="text-lg font-semibold text-aurora">Operator insights</h3>
      <p className="mt-2 text-sm text-quartz/70">
        Translate workload assumptions into infrastructure checkpoints. Use these notes in design reviews or runbooks.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {focusAreas.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate/40 p-5 text-sm text-quartz/80">
            <h4 className="text-aurora">{item.title}</h4>
            <p className="mt-2 leading-relaxed">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
