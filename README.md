# Univeral Env

Universal runtime-independent, framework-agnostic environment variable validation and typing tool, that:

- Validates env vars using a schema using Zod
- Generates types for IDE safety
- Works across:
    - Node.js
    - Bun
    - Deno
- Fails fast before bootstrapping the serve

```typescript

import { validateEnv } from "@universal-env/core"
import { z } from "zod";

const envSchema = z.object({
	DB_URI: z.string().url(),
	JWT_SECRET: z.string().min(10, "JWT_SECRET is required"),
});

// Works in Node.js, Bun and Cloud Functions, Deno.env.toObject() for Deno, Check for yours
const rawEnv = process.env;
await validateEnv(envSchema, rawEnv, ".env.d.ts")
```

You can put this piece of code in a file to run before starting the server

Will Support Vite, Express and Hono startup events in future

### Why ?

This package ensures that all required environment variables are present and correctly formatted before your server starts. By validating environment variables at startup using schema definitions (like Zod), it enforces strict configuration rules and prevents runtime crashes due to missing or invalid values. This promotes a fail-fast architecture — allowing developers to catch configuration issues immediately during deployment or development, not during runtime.
