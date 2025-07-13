import { describe, it, expect, afterAll, beforeAll } from "bun:test";
import { z } from "zod";
import { validateEnv } from "../../packages/core";
import { readFileSync, rmSync, writeFile } from "fs";

const OUTPUT_FILE = "./test-env.d.ts";

beforeAll(() => {
  writeFile(OUTPUT_FILE, "", (err) => {
    if (err) throw err;
    console.log(`Added ${OUTPUT_FILE} for tests`)
  })
})

afterAll(() => {
  try {
    rmSync(OUTPUT_FILE)
  } catch (error) {
    console.error(`Removed ${OUTPUT_FILE} after all tests`)
    console.error(error)
  }
})

describe("validateEnv", () => {
  const schema = z.object({
    PORT: z.string().regex(/^\d+$/),
    DATABASE_URL: z.string().url(),
  });

  it("validates and writes file when env is valid", async () => {
    const mockEnv = {
      PORT: "3000",
      DATABASE_URL: "https://example.com",
    };

    await validateEnv(schema, mockEnv, OUTPUT_FILE);

    const content = readFileSync(OUTPUT_FILE, "utf-8");

    expect(content).toContain("PORT: string;");
    expect(content).toContain("DATABASE_URL: string;");
  });

  it("fails with missing env", async () => {
    const mockEnv = {
      PORT: "3000",
    };

    try {
      await validateEnv(schema, mockEnv, OUTPUT_FILE);
      throw new Error("Should not reach here");
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it("fails with invalid env value", async () => {
    const mockEnv = {
      PORT: "not-a-port",
      DATABASE_URL: "not-a-url",
    };

    try {
      await validateEnv(schema, mockEnv, OUTPUT_FILE);
      throw new Error("Should not reach here");
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it("writes types correctly", async () => {
    const mockEnv = {
      PORT: "3000",
      DATABASE_URL: "https://example.com",
    };

    await validateEnv(schema, mockEnv, OUTPUT_FILE);
    const content = readFileSync(OUTPUT_FILE, "utf-8");

    expect(content).toContain(`{\n    PORT: string;\n    DATABASE_URL: string;\n}`)
  });
});
