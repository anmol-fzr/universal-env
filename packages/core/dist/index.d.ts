import { ZodRawShape, ZodObject } from 'zod';

declare const contentStr: "{{content}}";
type Wrapper = `${string}${typeof contentStr}${string} `;
type ValidateEnv<T extends ZodRawShape> = {
    schema: ZodObject<T>;
    rawEnv: Record<string, string | undefined>;
    path: string;
    wrapper?: Wrapper;
};
declare function validateEnv<T extends ZodRawShape>({ schema, rawEnv, path, wrapper }: ValidateEnv<T>): Promise<void>;

export { validateEnv };
