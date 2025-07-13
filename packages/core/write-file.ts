const isBun = () => typeof Bun !== "undefined"
const isDeno = () => typeof Deno !== "undefined"

async function writeFile(path: string, content: string): Promise<void> {
  if (isBun()) {
    await Bun.write(path, content);
    return;
  }

  if (isDeno()) {
    await Deno.writeTextFile(path, content);
    return;
  }

  if (typeof process !== "undefined" && typeof require !== "undefined") {
    const { writeFile } = await import("fs/promises");
    await writeFile(path, content, "utf-8");
    return;
  }

  throw new Error("Unsupported runtime for file writing");
}

export { writeFile }
