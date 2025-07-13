import { z } from "zod"
import { writeFile } from "./write-file";
import { genTypeFile } from "./gen-types";

export async function validateEnv<T extends z.ZodRawShape>(schema: z.ZodObject<T>, rawEnv: Record<string, string | undefined> = process.env, path: string) {
  try {
    await schema.parseAsync(rawEnv)

    console.log("Envs Validated Successfully");
    const generatedTypes = genTypeFile(schema);

    await writeFile(path, generatedTypes)
    console.log("Env Types Added Successfully");
  } catch (err: any) {
    throw new Error(err)
  }
}
