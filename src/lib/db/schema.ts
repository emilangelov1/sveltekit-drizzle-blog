import { boolean, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

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

export const StarredBlogsTable = pgTable('starred_blogs', {
	blogId: integer('blogId')
		.notNull()
		.references(() => BlogTable.id),
	userId: integer('userId')
		.notNull()
		.references(() => UserTable.id),
	starred: boolean('starred').notNull()
});
