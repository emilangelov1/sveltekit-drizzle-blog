import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
	out: './src/lib/db/migrations',
	schema: './src/lib/db/schema.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string
	},
	verbose: true,
	strict: true
});
