import { db } from '$lib/db/db.js';
import { BlogTable, UserTable } from '$lib/db/schema.js';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const blogId = Number(params.id);
	const blog = (
		await db
			.select({
				id: BlogTable.id,
				title: BlogTable.title,
				body: BlogTable.body,
				authorId: BlogTable.authorId
			})
			.from(BlogTable)
			.where(eq(BlogTable.id, blogId))
	).at(0);
	return {
		blog
	};
};

export const actions = {
	createBlog: async (event) => {
		const formData = await event.request.formData();
		const blogId = Number(event.url.pathname.split('/').at(-1));
		const titleContent = formData.get('title') as string;
		const bodyContent = formData.get('body') as string;
		const styleMap = formData.get('styleMap') as string;
		const title = { content: titleContent, style: JSON.parse(styleMap).titleStyle };
		const body = { content: bodyContent, style: JSON.parse(styleMap).bodyStyle };
		const cookie = event.cookies.get('role');
		if (cookie) {
			const authorId =
				(
					await db
						.select({
							id: UserTable.id
						})
						.from(UserTable)
						.where(eq(UserTable.sessionId, cookie))
				).at(0)?.id || 0;
			const res = await db
				.update(BlogTable)
				.set({ title, body, authorId, date: new Date().toDateString() })
				.where(eq(BlogTable.id, blogId))
				.returning();
			return { success: true, id: res.at(0)?.id };
		}
	}
};
