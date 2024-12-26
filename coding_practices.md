# Coding Practices

## Component Installation

### shadcn/ui Components
To install shadcn/ui components, use the following CLI command format:
```bash
pnpm dlx shadcn@latest add <component-name>
```

Example:
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add alert
```

This will:
1. Add the component to your project
2. Set up necessary dependencies
3. Create the component in your components/ui directory

## Import Paths

### Alias Configuration
Import aliases are configured in `tsconfig.json` under the `paths` section. Use `@components` instead of `@/components` for imports:

```typescript
// Correct usage
import { Button } from '@components/ui/button'

// Incorrect usage
import { Button } from '@/components/ui/button'
```

This matches the path aliases defined in the tsconfig.json configuration.
