import { db } from '$lib/db/db';
import { BlogTable, StarredBlogsTable, UserTable } from '$lib/db/schema';
import { and, count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const blogs = await db
		.select()
		.from(BlogTable)
		.where(eq(BlogTable.id, Number(params.id)))
		.limit(1);
	const canLike = cookies.get('role') !== 'guest' ? true : false;
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
			const userId =
				(
					await db
						.select({
							id: UserTable.id
						})
						.from(UserTable)
						.where(eq(UserTable.sessionId, cookie))
				)?.at(0)?.id || 0;
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
				isStarred: isStarred?.at(0)?.starred || false
			};
		}
		return { blog: blogs[0], starsCount: starsCount?.at(0)?.count, canLike, isStarred: false };
	}
	return { blog: blogs[0], starsCount: 0, canLike: false, isStarred: false };
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
	}
};
