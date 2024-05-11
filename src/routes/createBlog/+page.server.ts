import { db } from '$lib/db/db.js';
import { BlogTable, UserTable } from '$lib/db/schema.js';
import { eq } from 'drizzle-orm';

export const actions = {
	createBlog: async ({ request, cookies }) => {
		const formData = await request.formData();
		const titleContent = formData.get('title') as string;
		const bodyContent = formData.get('body') as string;
		const styleMap = formData.get('styleMap') as string;
		console.log(styleMap);
		const title = {
			content: titleContent.length ? titleContent : 'Title',
			style: JSON.parse(styleMap).titleStyle
		};
		const body = {
			content: bodyContent.length ? bodyContent : 'Body',
			style: JSON.parse(styleMap).bodyStyle
		};
		const cookie = cookies.get('role');
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
				.insert(BlogTable)
				.values({ title, body, authorId, date: new Date().toDateString() })
				.returning();
			return { success: true, id: res.at(0)?.id };
		}
	}
};
