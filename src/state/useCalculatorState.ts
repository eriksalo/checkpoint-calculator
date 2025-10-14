import { create } from 'zustand';

export type WorkloadProfile = 'hpc' | 'ai-training' | 'inference';

export interface CalculatorState {
  profile: WorkloadProfile;
  nodes: number;
  checkpointSizeTb: number;
  intervalMinutes: number;
  retentionHours: number;
  storageTier: 'local' | 'burst-buffer' | 'object';
  setProfile: (profile: WorkloadProfile) => void;
  setNodes: (nodes: number) => void;
  setCheckpointSizeTb: (size: number) => void;
  setIntervalMinutes: (minutes: number) => void;
  setRetentionHours: (hours: number) => void;
  setStorageTier: (tier: CalculatorState['storageTier']) => void;
}

export const useCalculatorState = create<CalculatorState>((set) => ({
  profile: 'hpc',
  nodes: 512,
  checkpointSizeTb: 2,
  intervalMinutes: 30,
  retentionHours: 12,
  storageTier: 'burst-buffer',
  setProfile: (profile) => set({ profile }),
  setNodes: (nodes) => set({ nodes }),
  setCheckpointSizeTb: (checkpointSizeTb) => set({ checkpointSizeTb }),
  setIntervalMinutes: (intervalMinutes) => set({ intervalMinutes }),
  setRetentionHours: (retentionHours) => set({ retentionHours }),
  setStorageTier: (storageTier) => set({ storageTier })
}));
