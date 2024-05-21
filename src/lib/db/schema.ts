import { boolean, integer, pgTable, serial, varchar, json, date } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

export const UserTable = pgTable('user', {
	id: serial('id').primaryKey(),
	userName: varchar('name').notNull(),
	email: varchar('email').notNull(),
	password: varchar('password').notNull(),
	sessionId: varchar('sessionId').notNull(),
	salt: varchar('salt').notNull()
});

export const BlogTable = pgTable('blog', {
	id: serial('id').primaryKey(),
	title: json('title').notNull(),
	body: json('body').notNull(),
	authorId: integer('authorId')
		.references(() => UserTable.id)
		.notNull(),
	date: date('date').notNull()
});

export const StarredBlogsTable = pgTable('starred_blogs', {
	id: serial('id').primaryKey(),
	blogId: integer('blogId')
		.notNull()
		.references(() => BlogTable.id),
	userId: integer('userId')
		.references(() => UserTable.id)
		.notNull(),
	starred: boolean('starred').notNull()
});
