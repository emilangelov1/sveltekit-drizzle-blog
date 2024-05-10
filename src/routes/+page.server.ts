import { db } from '$lib/db/db';
import { BlogTable } from '$lib/db/schema';
import { like } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const blogs = await db.select().from(BlogTable);
	const isLoggedIn = cookies.get('role') !== 'guest' ? true : false;
	console.log(url.searchParams.get('search'));
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
