import { motion } from 'framer-motion';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  caption?: string;
  accent?: 'aurora' | 'ember';
}

const accentClass: Record<NonNullable<StatCardProps['accent']>, string> = {
  aurora: 'text-aurora',
  ember: 'text-ember'
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, caption, accent = 'aurora' }) => (
  <motion.div
    className="glass-panel rounded-2xl p-6 flex flex-col gap-2"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <span className="uppercase tracking-wide text-xs text-quartz/60">{label}</span>
    <span className={`text-4xl font-semibold ${accentClass[accent]}`}>{value}</span>
    {caption ? <span className="text-sm text-quartz/70">{caption}</span> : null}
  </motion.div>
);
