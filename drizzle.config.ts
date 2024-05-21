import { defineConfig } from 'drizzle-kit';
import './envConfig';

export default defineConfig({
	out: './src/lib/db/migrations',
	schema: './src/lib/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRES_URL! as string
	},
	verbose: true,
	strict: true
});
