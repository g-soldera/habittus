import { BioMonitor } from '@/types';

export const DAILY_DECAY = {
  ram: 1, // points per day
  hardware: 1,
  cool: 1,
};

export const applyDailyDecay = (bio: BioMonitor, days = 1): BioMonitor => {
  const updated: BioMonitor = { ...bio };
  const decayRam = DAILY_DECAY.ram * days;
  const decayHardware = DAILY_DECAY.hardware * days;
  const decayCool = DAILY_DECAY.cool * days;

  updated.ram = Math.max(0, Math.round(updated.ram - decayRam));
  updated.hardware = Math.max(0, Math.round(updated.hardware - decayHardware));
  updated.cool = Math.max(0, Math.round(updated.cool - decayCool));

  // totalXp decays slowly (small percentage)
  const xpDecayPercent = 0.001 * days; // 0.1% per day
  updated.totalXp = Math.max(0, Math.round(updated.totalXp * (1 - xpDecayPercent)));

  return updated;
};

export const computeDailyDecayForDays = (bio: BioMonitor, days = 1) => {
  return applyDailyDecay(bio, days);
};

export default {
  applyDailyDecay,
  computeDailyDecayForDays,
};
