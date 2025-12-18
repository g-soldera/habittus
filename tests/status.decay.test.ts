import { describe, it, expect } from 'vitest';
import { applyDailyDecay } from '@/lib/status';

import { createDefaultBioMonitor } from '@/lib/mock-data';

describe('status decay', () => {
  it('applies daily decay to bio monitor stats', () => {
    const bio = createDefaultBioMonitor();
    bio.ram = 20;
    bio.hardware = 30;
    bio.cool = 40;
    bio.totalXp = 10000;

    const updated = applyDailyDecay(bio, 3); // 3 days
    expect(updated.ram).toBe(17); // 20 - 3
    expect(updated.hardware).toBe(27);
    expect(updated.cool).toBe(37);
    // XP decays slightly
    expect(updated.totalXp).toBeLessThan(10000);
  });
});