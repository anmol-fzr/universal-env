import type { ZodRawShape, ZodObject } from "zod"
import { writeFile } from "./write-file";
import { genTypeFile } from "./gen-types";

const contentStr = `{{content}}` as const

type Wrapper = `${string}${typeof contentStr}${string} `

type ValidateEnv<T extends ZodRawShape> = {
  schema: ZodObject<T>,
  rawEnv: Record<string, string | undefined>,
  path: string,
  wrapper?: Wrapper
}

export async function validateEnv<T extends ZodRawShape>({ schema, rawEnv = process.env, path, wrapper }: ValidateEnv<T>) {
  try {
    await schema.parseAsync(rawEnv)

    console.log("Envs Validated Successfully");
    const generatedTypes = genTypeFile(schema);

    if (wrapper) {
      const genFileContent = wrapper.replace(contentStr, generatedTypes)
      await writeFile(path, genFileContent)
    }
    else {
      await writeFile(path, generatedTypes)
    }

    console.log("Env Types Added Successfully");
  } catch (err: any) {
    throw new Error(err)
  }
}
