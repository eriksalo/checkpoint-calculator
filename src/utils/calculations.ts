import type { CalculatorState } from '../state/useCalculatorState';

export interface CalculatorOutputs {
  checkpointsPerDay: number;
  dailyDataMovedTb: number;
  storageFootprintTb: number;
  requiredThroughputGbps: number;
}

const PROFILE_MULTIPLIERS: Record<CalculatorState['profile'], number> = {
  hpc: 1,
  'ai-training': 1.4,
  inference: 0.5
};

const STORAGE_EFFICIENCY: Record<CalculatorState['storageTier'], number> = {
  local: 0.92,
  'burst-buffer': 0.85,
  object: 0.78
};

export function computeOutputs(state: CalculatorState): CalculatorOutputs {
  const multiplier = PROFILE_MULTIPLIERS[state.profile];
  const effectiveCheckpoint = state.checkpointSizeTb * multiplier;
  const checkpointsPerDay = Math.floor((24 * 60) / state.intervalMinutes);
  const dailyDataMovedTb = checkpointsPerDay * effectiveCheckpoint;
  const retentionBlocks = Math.ceil(state.retentionHours * 60 / state.intervalMinutes);
  const storageFootprintTb = retentionBlocks * effectiveCheckpoint * STORAGE_EFFICIENCY[state.storageTier];
  const requiredThroughputGbps = (effectiveCheckpoint * 8192) / (state.intervalMinutes * 60);

  return {
    checkpointsPerDay,
    dailyDataMovedTb: Number(dailyDataMovedTb.toFixed(2)),
    storageFootprintTb: Number(storageFootprintTb.toFixed(2)),
    requiredThroughputGbps: Number(requiredThroughputGbps.toFixed(2))
  };
}
