import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.cookies.getAll().length === 0) {
		event.cookies.set('role', 'guest', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		});
	}
	if (event.url.pathname === '/createBlog') {
		if (event.cookies.get('role') === 'guest') {
			throw redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	return response;
};
