import { db } from '$lib/db/db';
import { BlogTable, StarredBlogsTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const blogs = await db
		.select()
		.from(BlogTable)
		.where(eq(BlogTable.id, Number(params.id)))
		.limit(1);
	if (blogs.length === 0) {
		error(404, 'Blog not found');
	}
	if (blogs.length) {
		const starsCount = await db
			.select()
			.from(StarredBlogsTable)
			.where(eq(StarredBlogsTable.blogId, blogs[0].id));
		return { blog: blogs[0], starsCount };
	}
	return { blog: blogs[0] };
};
