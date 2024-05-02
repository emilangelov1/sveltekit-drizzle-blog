import { boolean, integer, pgTable, serial, varchar, json } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
	id: serial('id').primaryKey(),
	userName: varchar('name').notNull(),
	email: varchar('email').notNull(),
	password: varchar('password').notNull(),
	sessionId: varchar('sessionId'),
	salt: varchar('salt').notNull()
});

export const BlogTable = pgTable('blog', {
	id: serial('id').primaryKey(),
	title: json('title').notNull(),
	body: json('body').notNull(),
	authorId: integer('authorId').references(() => UserTable.id)
});

export const StarredBlogsTable = pgTable('starred_blogs', {
	id: serial('id').primaryKey(),
	blogId: integer('blogId')
		.notNull()
		.references(() => BlogTable.id),
	userId: integer('userId').references(() => UserTable.id),
	starred: boolean('starred').notNull()
});
