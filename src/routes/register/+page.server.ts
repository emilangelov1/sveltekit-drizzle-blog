import { db } from '$lib/db/db.js';
import { UserTable } from '$lib/db/schema.js';
import { setCookie } from '$lib/functions/cookies.js';
import { generateSalt, hashPassword } from '$lib/functions/password.js';
import { eq } from 'drizzle-orm';

export const actions = {
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const salt = generateSalt(8);
		const hashedPassword = await hashPassword(password, salt).then((e) => e);
		const userEmail = await db.select().from(UserTable).where(eq(UserTable.email, email));
		const sessionId = generateSalt(20);
		if (userEmail.length > 0) {
			return {
				success: false,
				message: 'User with this email already exists'
			};
		}
		const response = await db
			.insert(UserTable)
			.values({ userName: username, email, password: hashedPassword, salt, sessionId })
			.returning();
		if (response?.at(0)) await setCookie(event, sessionId);
		return {
			success: true,
			message: 'Successfully registered'
		};
	}
};
