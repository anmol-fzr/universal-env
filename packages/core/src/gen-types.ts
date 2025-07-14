import { z } from "zod";
import { zodToTs, printNode } from "zod-to-ts";

function genTypeFile<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const envSchemaTs = zodToTs(schema);
  const content = printNode(envSchemaTs.node)

  return content
}

export { genTypeFile };
