import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull()
});

export const BlogTable = pgTable('blog', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	body: varchar('body').notNull(),
	authorId: integer('authorId').references(() => UserTable.id)
});
