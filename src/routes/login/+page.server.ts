import { db } from '$lib/db/db.js';
import { UserTable } from '$lib/db/schema.js';
import { setCookie } from '$lib/functions/cookies.js';
import { hashPassword } from '$lib/functions/password';
import { eq } from 'drizzle-orm';

export const actions = {
	async login(event) {
		const data = await event.request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const user = await db.select().from(UserTable).where(eq(UserTable.email, email));
		if (user.length === 0) {
			return {
				message: 'User not found',
				success: false
			};
		}
		if (!user[0].email) {
			return {
				message: 'User not found',
				success: false
			};
		}
		if (user[0].password !== (await hashPassword(password, user[0].salt))) {
			return {
				message: 'Wrong password',
				success: false
			};
		}
		if (user[0].password === (await hashPassword(password, user[0].salt))) {
			if (user[0].sessionId) await setCookie(event, user[0].sessionId);
			return {
				message: 'Successfully logged in',
				success: true,
				sessionId: user[0].sessionId
			};
		}
	}
};
