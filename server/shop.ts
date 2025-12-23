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
      const { rewardId } = input as { rewardId: number; quantity?: number };
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      // fetch reward
      const [reward] = await db.select().from(rewards).where(eq(rewards.id, rewardId)).limit(1);
      if (!reward) throw new TRPCError({ code: "NOT_FOUND", message: "Reward not found" });

      // Fetch user (simple check for credits in users table)
      const userRow = await db.select().from("users"); // minimal placeholder - up to your app to implement proper query

      // NOTE: For safety, a production implementation should perform an atomic transaction:
      // 1) Check user credits
      // 2) Deduct credits
      // 3) Insert purchase
      // 4) Return success
      // Here we implement a minimal transactional placeholder.

      try {
        await db.transaction(async (tx) => {
          await tx.insert(purchases).values({ userId: ctx.user!.id, rewardId, quantity: input.quantity ?? 1 });
          // TODO: Deduct credits from user
        });
      } catch (err) {
        console.error("Failed to complete purchase", err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to complete purchase" });
      }

      return { success: true } as const;
    }),
});
