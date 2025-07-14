# Univeral Env Vite Adapter

Universal runtime-independent, framework-agnostic environment variable validation and typing tool, that:

- Validates env vars using a schema using Zod
- Generates types for IDE safety
- Works across:
    - Node.js
    - Bun
    - Deno
- Fails fast before bootstrapping the serve

- [Core](https://github.com/anmol-fzr/universal-env) 

## Usage
```typescript
import { defineConfig } from 'vite'
import { universalEnv } from "@universal-env/vite"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default defineConfig({
  plugins: [
    universalEnv({ schema: loginSchema })
  ],
})
```

## Recommended
to freeze the env Object

```typescript
const envs = process.env; // Works in Node.js, Bun and Cloud Functions, Deno.env.toObject() for Deno, Check for yours

const envs = Object.freeze({
    JWT_SECRET: envs.JWT_SECRET,
})
```
