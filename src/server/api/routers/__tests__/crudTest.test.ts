/*import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { db } from "~/server/db";
import { testAppRouter } from "~/server/api/testRoot";
import { createTestContext } from "~/server/api/testContext"; // 👈 Importa el contexto de prueba

// Crea el contexto de prueba
const testContext = createTestContext();

// Crea el caller usando el contexto de prueba
const caller = testAppRouter.createCaller(testContext);

describe("Restaurant → Burger → Comment flow", () => {
  let restaurantId: string;
  let burgerId: string;
  let commentId: string;

  beforeAll(async () => {
    // Clean up DB before testing
    await db.comment.deleteMany();
    await db.burger.deleteMany();
    await db.restaurant.deleteMany();
  });

  afterAll(async () => {
    // Optional cleanup
    await db.comment.deleteMany();
    await db.burger.deleteMany();
    await db.restaurant.deleteMany();
    await db.$disconnect();
  });

  it("should create a restaurant", async () => {
    const result = await caller.restaurant.create({
      name: "Test Restaurant",
      grade: 4.0,
    });
    restaurantId = result.id;
    expect(result.name).toBe("Test Restaurant");
  });

  it("should create a burger for the restaurant", async () => {
    const result = await caller.burger.create({
      name: "Test Burger",
      price: 23.3,
      restaurantId,
    });
    burgerId = result.id;
    expect(result.name).toBe("Test Burger");
    expect(result.restaurantId).toBe(restaurantId);
  });

  it("should create a comment for the burger", async () => {
    const result = await caller.comment.create({
      content: "Very tasty!",
      grade: 5.0,
      burgerId,
      userId: "user123",
    });
    commentId = result.id;
    expect(result.content).toBe("Very tasty!");
    expect(result.burgerId).toBe(burgerId);
  });

  it("should list burgers and comments by restaurant", async () => {
    const burgers = await caller.burger.list({ restaurantId });
    expect(burgers.length).toBe(1);
    expect(burgers[0].id).toBe(burgerId);

    const comments = await caller.comment.listByBurger({ burgerId });
    expect(comments.length).toBe(1);
    expect(comments[0].id).toBe(commentId);
  });
});*/
