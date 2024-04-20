import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull()
});
