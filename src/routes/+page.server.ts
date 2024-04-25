import { db } from '$lib/db/db';
import { BlogTable, StarredBlogsTable } from '$lib/db/schema';
import { count, inArray } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ route }) => {
	console.log({ route });
	const blogs = await db.select().from(BlogTable);
	if (blogs.length) {
		const starsCount = await db
			.select({ value: count() })
			.from(StarredBlogsTable)
			.where(
				inArray(
					StarredBlogsTable.blogId,
					blogs.map((e) => e.id)
				)
			);
		return { blogs, starsCount };
	}
	return { blogs };
};

export const actions = {
	createBlog: async (event) => {
		const formData = await event.request.formData();
		const title = formData.get('title') as string;
		const body = formData.get('body') as string;
		const authorId = null;
		await db.insert(BlogTable).values({ title, body, authorId });
		return { success: true };
	},
	starBlog: async (event) => {
		const formData = await event.request.formData();
		const userId = 1;
		const blogId = formData.get('starButton') as unknown as number;
		console.log(Object.keys(formData), blogId);
		await db.insert(StarredBlogsTable).values({ starred: true, blogId, userId });
		return { success: true };
	}
};
