import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres(DATABASE_URL, { max: 1 });
async function main() {
	await migrate(drizzle(migrationClient), {
		migrationsFolder: 'src/lib/migrations'
	});
	await migrationClient.end();
}
main();
