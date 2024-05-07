import { db } from '$lib/db/db.js';
import { BlogTable, UserTable } from '$lib/db/schema.js';
import { eq } from 'drizzle-orm';

export const actions = {
	createBlog: async (event) => {
		const formData = await event.request.formData();
		const titleContent = formData.get('title') as string;
		const bodyContent = formData.get('body') as string;
		const styleMap = formData.get('styleMap') as string;
		console.log(styleMap);
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
			const res = await db.insert(BlogTable).values({ title, body, authorId }).returning();
			return { success: true, id: res.at(0)?.id };
		}
	}
};
