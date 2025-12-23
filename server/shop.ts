import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { eq } from "drizzle-orm";
import { rewards, purchases } from "../drizzle/schema";

export const shopRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [] as any[];
    const rows = await db.select().from(rewards);
    return rows;
  }),

  purchase: protectedProcedure
    .input((val: any) => val)
    .mutation(async ({ input, ctx }) => {
      const { rewardId } = input as { rewardId: string | number; quantity?: number };
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      // Try to resolve reward by numeric id or by handle string
      let rewardRow: any = null;
      if (typeof rewardId === 'number' || !Number.isNaN(Number(rewardId))) {
        const idNum = Number(rewardId);
        const [r] = await db.select().from(rewards).where(eq(rewards.id, idNum)).limit(1);
        rewardRow = r;
      }

      if (!rewardRow && typeof rewardId === 'string') {
        const [r] = await db.select().from(rewards).where(eq(rewards.handle, rewardId)).limit(1 as any);
        rewardRow = r;
      }

      if (!rewardRow) throw new TRPCError({ code: "NOT_FOUND", message: "Reward not found" });

      if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not authenticated' });

      try {
        const inserted = await db.transaction(async (tx) => {
          const res = await tx.insert(purchases).values({ userId: ctx.user!.id, rewardId: rewardRow.id, quantity: input.quantity ?? 1 });
          return res;
        });
        return { success: true, purchase: inserted } as const;
      } catch (err) {
        console.error("Failed to complete purchase", err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to complete purchase" });
      }
    }),
});
