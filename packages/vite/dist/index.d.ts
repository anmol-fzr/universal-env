import { Plugin } from 'vite';
import { z } from 'zod';

declare function universalEnv({ schema, envPath, outputPath, }: {
    schema: z.ZodObject<any>;
    envPath?: string;
    outputPath?: string;
}): Plugin;

export { universalEnv };
