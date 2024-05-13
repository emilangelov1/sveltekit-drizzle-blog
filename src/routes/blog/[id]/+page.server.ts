import { db } from '$lib/db/db';
import { BlogTable, StarredBlogsTable, UserTable } from '$lib/db/schema';
import { and, count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const blogs = await db
		.select()
		.from(BlogTable)
		.where(eq(BlogTable.id, Number(params.id)))
		.limit(1);
	const canLike = cookies.get('role') !== 'guest' ? true : false;
	const author = await db
		.select({ author: UserTable.userName, id: UserTable.id })
		.from(UserTable)
		.where(eq(UserTable.id, blogs[0].authorId));
	const user = await db
		.select({ id: UserTable.id })
		.from(UserTable)
		.where(eq(UserTable.sessionId, cookies.get('role') || ''));
	const hasPermissions = () => {
		if (cookies.get('role') === 'guest') {
			return false;
		}
		if (cookies.get('role') !== 'guest') {
			if (user.at(0)?.id === author.at(0)?.id) return true;
		}
	};
	if (blogs.length === 0) {
		error(404, 'Blog not found');
	}
	if (blogs.length) {
		const cookie = cookies.get('role');
		const starsCount = await db
			.select({ count: count() })
			.from(StarredBlogsTable)
			.where(and(eq(StarredBlogsTable.blogId, blogs[0].id), eq(StarredBlogsTable.starred, true)));
		if (cookie) {
			const user = await db
				.select({
					id: UserTable.id,
					name: UserTable.userName
				})
				.from(UserTable)
				.where(eq(UserTable.sessionId, cookie));
			const userId = user?.at(0)?.id || 0;
			const isStarred = await db
				.select({
					starred: StarredBlogsTable.starred
				})
				.from(StarredBlogsTable)
				.where(
					and(eq(StarredBlogsTable.userId, userId), eq(StarredBlogsTable.blogId, blogs[0].id))
				);
			return {
				blog: blogs[0],
				starsCount: starsCount?.at(0)?.count,
				canLike,
				isStarred: isStarred?.at(0)?.starred || false,
				author: author.at(0)?.author,
				hasPermissions: hasPermissions()
			};
		}
		return {
			blog: blogs[0],
			starsCount: starsCount?.at(0)?.count,
			canLike,
			isStarred: false,
			author: author.at(0)?.author,
			hasPermissions: hasPermissions()
		};
	}
	return {
		blog: blogs[0],
		starsCount: 0,
		canLike: false,
		isStarred: false,
		author: author.at(0)?.author,
		hasPermissions: hasPermissions()
	};
};

export const actions = {
	starBlog: async (event) => {
		const cookie = event.cookies.get('role');
		if (cookie) {
			const userId =
				(
					await db
						.select({
							id: UserTable.id
						})
						.from(UserTable)
						.where(eq(UserTable.sessionId, cookie))
				)?.at(0)?.id || 0;
			const blogId = Number(event.url.pathname.split('/').at(-1));
			const isStarredAlready = await db
				.select({
					starred: StarredBlogsTable.starred
				})
				.from(StarredBlogsTable)
				.where(and(eq(StarredBlogsTable.userId, userId), eq(StarredBlogsTable.blogId, blogId)));
			if (isStarredAlready.at(0)) {
				await db
					.update(StarredBlogsTable)
					.set({ starred: !isStarredAlready.at(0)?.starred })
					.where(and(eq(StarredBlogsTable.blogId, blogId), eq(StarredBlogsTable.userId, userId)));
				return { success: true };
			}
			await db
				.insert(StarredBlogsTable)
				.values({ starred: !isStarredAlready.at(0)?.starred, blogId, userId });
			return { success: true };
		}
		return { success: false };
	},
	deleteBlog: async ({ cookies, params, url }) => {
		const cookie = cookies.get('role');
		const blog = await db
			.select()
			.from(BlogTable)
			.where(eq(BlogTable.id, Number(params.id)))
			.limit(1);
		if (cookie) {
			const user = await db
				.select({
					id: UserTable.id,
					name: UserTable.userName
				})
				.from(UserTable)
				.where(eq(UserTable.sessionId, cookie));
			const userId = user?.at(0)?.id || 0;
			if (cookie !== 'guest' && userId === blog.at(0)?.authorId) {
				const blogId = Number(url.pathname.split('/').at(-1));
				await db.delete(StarredBlogsTable).where(eq(StarredBlogsTable.blogId, blogId));
				await db
					.delete(BlogTable)
					.where(and(eq(BlogTable.id, blogId), eq(BlogTable.authorId, userId)));
				throw redirect(302, '/');
			}
		}
		return { success: false, message: 'Not Authorized' };
	}
};
