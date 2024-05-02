import { db } from '$lib/db/db.js';
import { BlogTable, StarredBlogsTable } from '$lib/db/schema.js';

export const actions = {
	createBlog: async (event) => {
		const formData = await event.request.formData();
		const titleContent = formData.get('title') as string;
		const bodyContent = formData.get('body') as string;
		const styleMap = formData.get('styleMap') as string;
		console.log(styleMap);
		const title = { content: titleContent, style: JSON.parse(styleMap).titleStyle };
		const body = { content: bodyContent, style: JSON.parse(styleMap).bodyStyle };
		const authorId = null;
		const res = await db.insert(BlogTable).values({ title, body, authorId }).returning();
		return { success: true, id: res.at(0)?.id };
	},
	starBlog: async (event) => {
		const formData = await event.request.formData();
		const userId = 1;
		const blogId = formData.get('starButton') as unknown as number;
		await db.insert(StarredBlogsTable).values({ starred: true, blogId, userId });
		return { success: true };
	}
};
