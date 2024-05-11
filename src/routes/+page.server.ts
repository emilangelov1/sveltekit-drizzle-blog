import { db } from '$lib/db/db';
import { BlogTable, StarredBlogsTable } from '$lib/db/schema';
import { asc, count, desc, eq, like } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

interface FilterQuery {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(): Promise<any[]>;
}

type Blogs<T> = { id?: number; title?: T; body?: T; authorId?: number | null }[];

type T = { content: string; style: string };

export const load: PageServerLoad = async ({ url, cookies }) => {
	const blogs = await db.select().from(BlogTable);
	const isLoggedIn = cookies.get('role') !== 'guest' ? true : false;
	const filterTypes: Record<string, FilterQuery> = {
		Newest: async () => await db.select().from(BlogTable).orderBy(desc(BlogTable.date)),
		Oldest: async () => await db.select().from(BlogTable).orderBy(asc(BlogTable.date)),
		'Highest Rated': async () =>
			await db
				.select()
				.from(BlogTable)
				.leftJoin(StarredBlogsTable, eq(BlogTable.id, StarredBlogsTable.blogId))
				.groupBy(BlogTable.id, BlogTable.title, StarredBlogsTable.id)
				.orderBy(desc(count(StarredBlogsTable.id))),
		'Lowest Rated': async () =>
			await db
				.select()
				.from(BlogTable)
				.leftJoin(StarredBlogsTable, eq(BlogTable.id, StarredBlogsTable.blogId))
				.groupBy(BlogTable.id, BlogTable.title, StarredBlogsTable.id)
				.orderBy(asc(count(StarredBlogsTable.id)))
	};

	const searchType = Object.keys(filterTypes).find((e) => url.searchParams.get(e));
	if (searchType) {
		const search = filterTypes[searchType];
		const filteredBlogs = await search();
		return {
			blogs,
			filteredBlogs: filteredBlogs.map((e: Blogs<T> | { blog: Blogs<T> }) => {
				if ('blog' in e) {
					return e.blog as unknown as { blog: Blogs<T> };
				}
				return e;
			}),
			isLoggedIn
		};
	}

	if (url.searchParams.get('search')) {
		const filteredBlogs = await db
			.select()
			.from(BlogTable)
			.where(like(BlogTable.title, `%${url.searchParams.get('search')}%`));
		return { blogs, filteredBlogs, isLoggedIn };
	}
	if (url.searchParams.get('search') === '' || !url.searchParams.get('search')) {
		return { blogs, filteredBlogs: [], isLoggedIn };
	}
	return { blogs, filteredBlogs: [], isLoggedIn };
};
