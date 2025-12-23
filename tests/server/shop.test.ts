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
});
