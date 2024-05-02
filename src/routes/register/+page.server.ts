import { db } from '$lib/db/db.js';
import { UserTable } from '$lib/db/schema.js';
import { generateSalt, hashPassword } from '$lib/functions/password.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const salt = generateSalt(8);
		const hashedPassword = await hashPassword(password, salt).then((e) => e);
		await db
			.insert(UserTable)
			.values({ userName: username, email, password: hashedPassword, salt })
			.returning();
		redirect(302, '/');
	}
};

export const load = () => {};
