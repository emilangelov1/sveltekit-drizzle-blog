import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
	out: './src/lib/migrations',
	schema: './src/lib/schema.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string
	},
	verbose: true,
	strict: true
});
