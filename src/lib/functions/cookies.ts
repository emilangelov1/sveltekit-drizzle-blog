type Event = {
	cookies: { set: (name: string, value: string, type: Record<string, unknown>) => void };
};

export const setCookie = <T>(event: T, session: string) => {
	event.cookies.set('role', session, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
	}) as unknown as Event;
};
