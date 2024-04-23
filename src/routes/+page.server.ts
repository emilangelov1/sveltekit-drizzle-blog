import { db } from '$lib/db/db';
import { BlogTable } from '$lib/db/schema';
// import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const blogs = await db.select().from(BlogTable);
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
	}
	// starBlog: async (event) => {
	// 	const formData = await event.request.formData();
	// 	const blogId = formData.get('blogId') as number;
	// 	const userId = formData.get('userId') as number;
	// 	const isStarred = formData.get('isStarred') === 'true';
	// 	await db
	// 		.update(StarredBlogsTable)
	// 		.set({ starred: isStarred, blogId, userId })
	// 		.where(eq(BlogTable.id, blogId));
	// 	return { success: true };
	// }
};
