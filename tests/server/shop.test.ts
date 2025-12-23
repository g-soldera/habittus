import { describe, it, expect } from "vitest";
import { appRouter } from "../../server/routers";
import type { TrpcContext } from "../../server/_core/context";

function createCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "t@example.com",
      name: "Tester",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    } as any,
    req: { protocol: "https", headers: {} } as any,
    res: { clearCookie: () => {} } as any,
  } as TrpcContext;
}

describe("shop.list", () => {
  it("returns [] when DB is not available", async () => {
    const ctx = createCtx();
    const caller = appRouter.createCaller(ctx as any);
    const list = await caller.shop.list();
    expect(list).toEqual([]);
  });

  it('allows purchase when DB transaction succeeds', async () => {
    // Mock DB to simulate reward lookup and transaction
    const dbMock: any = {
      select: () => ({
        from: () => ({
          where: () => ({
            limit: () => [
              { id: 1, handle: 'r1', title: 'Test Reward', priceCredits: 50 },
            ],
          }),
        }),
      }),
      transaction: async (fn: any) => {
        return await fn({ insert: () => ({ values: () => ({ id: 123 }) }) });
      },
    };

    const dbModule = await import('../../server/db');
    vi.spyOn(dbModule, 'getDb').mockResolvedValue(dbMock as any);

    const ctx = createCtx();
    const caller = appRouter.createCaller(ctx as any);
    const res = await caller.shop.purchase({ rewardId: 'r1', quantity: 1 } as any);
    expect(res).toHaveProperty('success', true);
  });
});
